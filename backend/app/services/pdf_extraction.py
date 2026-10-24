import io
import shutil
import os
from pathlib import Path
from typing import Dict, Any, List
from pypdf import PdfReader
from backend.app.services.ocr_service import OCRService

class PDFExtractionService:
    @staticmethod
    def extract_pdf_data(file_bytes: bytes) -> Dict[str, Any]:
        """
        Extracts digital text, metadata, page count, and scan characteristics using pypdf.
        If pages have minimal or no digital text (scanned PDF), triggers Tesseract OCR on page images.
        """
        reader = PdfReader(io.BytesIO(file_bytes))
        pages_count = len(reader.pages)
        page_texts: List[str] = []
        total_chars = 0
        ocr_performed = False

        for i, page in enumerate(reader.pages):
            text = ""
            try:
                text = page.extract_text() or ""
            except Exception as e:
                text = f"[Error extracting text page {i+1}: {str(e)}]"

            # If page text is very sparse (< 50 chars), check if page contains embedded scanned images
            if len(text.strip()) < 50:
                try:
                    ocr_available, _ = OCRService.is_tesseract_available()
                    if ocr_available and hasattr(page, "images") and len(page.images) > 0:
                        ocr_snippets = []
                        for img_obj in page.images:
                            ocr_res = OCRService.process_image(img_obj.data)
                            if ocr_res.get("extracted_text"):
                                ocr_snippets.append(ocr_res["extracted_text"])
                                ocr_performed = True
                        if ocr_snippets:
                            text = (text + "\n" + "\n".join(ocr_snippets)).strip()
                except Exception:
                    pass

            page_texts.append(text)
            total_chars += len(text.strip())

        full_text = "\n\n--- Page Break ---\n\n".join(page_texts)

        # Heuristic: If average chars per page < 80 or OCR was needed, consider scanned
        avg_chars_per_page = total_chars / max(1, pages_count)
        is_scanned = avg_chars_per_page < 80 or ocr_performed

        # Extract metadata
        pdf_meta = {}
        if reader.metadata:
            for k, v in reader.metadata.items():
                clean_k = str(k).lstrip("/").replace(" ", "_")
                pdf_meta[clean_k] = str(v)

        return {
            "pages_count": pages_count,
            "full_text": full_text,
            "total_chars": total_chars,
            "avg_chars_per_page": avg_chars_per_page,
            "is_scanned": is_scanned,
            "ocr_performed": ocr_performed,
            "metadata": pdf_meta,
        }
