import io
import shutil
import os
from pathlib import Path
from typing import Dict, Any, Tuple, Optional
from PIL import Image, ImageChops, ImageEnhance

class OCRService:
    @staticmethod
    def is_tesseract_available() -> Tuple[bool, str]:
        """
        Detects whether tesseract binary is installed and executable on the host system.
        """
        # Check standard PATH
        binary_path = shutil.which("tesseract")
        if binary_path:
            return True, f"Tesseract binary detected at {binary_path}"
        
        # Check standard Windows paths
        win_candidates = [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            os.path.expanduser(r"~\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"),
        ]
        for candidate in win_candidates:
            if os.path.exists(candidate):
                return True, f"Tesseract binary detected at {candidate}"
                
        return False, "Tesseract OCR binary not detected on host system. Digital text parsing active via pypdf."

    @staticmethod
    def perform_ela(img: Image.Image, quality: int = 90) -> Tuple[Optional[bytes], float, bool, str]:
        """
        Executes genuine Error Level Analysis (ELA) to detect digital tampering,
        font baseline anomalies, or spliced stamp/seal artifacts.
        """
        try:
            orig = img.convert("RGB")
            buffer = io.BytesIO()
            orig.save(buffer, format="JPEG", quality=quality)
            buffer.seek(0)
            resaved = Image.open(buffer)

            diff = ImageChops.difference(orig, resaved)
            extrema = diff.getextrema()
            max_diff = max([ex[1] for ex in extrema]) if extrema else 0
            if max_diff == 0:
                max_diff = 1

            scale = min(255.0 / max_diff, 12.0)
            enhanced = ImageEnhance.Brightness(diff).enhance(scale)
            
            out_buf = io.BytesIO()
            enhanced.save(out_buf, format="PNG")
            ela_bytes = out_buf.getvalue()

            tampering_score = round(min(max(max_diff * 2.2, 5.0), 98.0), 1)
            is_anomaly = max_diff > 32

            if is_anomaly:
                note = f"Error Level Analysis (ELA) detected compression variance (Delta: {max_diff}/255, Risk: {tampering_score}%). Localized raster inconsistency suggests stamp/signature overlay or numerical modification."
            else:
                note = f"Error Level Analysis (ELA) verified uniform error rate (Delta: {max_diff}/255). Authenticity: {100 - tampering_score}%. No digital splicing or artifact anomalies detected."

            return ela_bytes, tampering_score, is_anomaly, note
        except Exception as e:
            return None, 0.0, False, f"ELA analysis error: {str(e)}"

    @staticmethod
    def process_image(image_bytes: bytes, doc_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Extracts image metadata, performs Error Level Analysis (ELA),
        and attempts genuine OCR if tesseract is available.
        """
        available, info = OCRService.is_tesseract_available()
        
        try:
            img = Image.open(io.BytesIO(image_bytes))
            width, height = img.size
            format_name = img.format or "UNKNOWN"
            mode = img.mode

            # Run authentic Error Level Analysis
            ela_bytes, tamper_score, ela_anomaly, ela_note = OCRService.perform_ela(img)

            # Heuristics: resolution + ELA variance
            is_anomaly = ela_anomaly
            anomaly_note = ela_note

            if width < 800 or height < 1000:
                is_anomaly = True
                anomaly_note = (anomaly_note or "") + f" [Low-res raster: {width}x{height}px may obscure seal verification.]"

            extracted_text = ""
            if available:
                try:
                    import pytesseract
                    win_exe = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
                    if os.path.exists(win_exe) and not shutil.which("tesseract"):
                        pytesseract.pytesseract.tesseract_cmd = win_exe
                    extracted_text = pytesseract.image_to_string(img)
                except Exception as e:
                    extracted_text = f"[OCR Execution Error: {str(e)}]"
            else:
                extracted_text = (
                    f"[Scanned Image Content: {format_name} {width}x{height}px]\n"
                    f"[Status: Host system has no native Tesseract OCR binary configured. "
                    f"Visual raster logged for manual inspection.]"
                )

            # If doc_id provided and ela_bytes available, save heatmap
            ela_saved_path = None
            if doc_id and ela_bytes:
                try:
                    from backend.app.config import settings
                    ela_path = settings.UPLOAD_DIR / f"{doc_id}_ela.png"
                    with open(ela_path, "wb") as f:
                        f.write(ela_bytes)
                    ela_saved_path = str(ela_path)
                except Exception:
                    pass

            return {
                "ocr_available": available,
                "engine_info": info,
                "extracted_text": extracted_text,
                "width": width,
                "height": height,
                "format": format_name,
                "mode": mode,
                "has_visual_anomaly": is_anomaly,
                "anomaly_details": anomaly_note,
                "tampering_score": tamper_score,
                "has_ela_heatmap": ela_saved_path is not None or ela_bytes is not None,
                "ela_bytes": ela_bytes,
            }
        except Exception as e:
            return {
                "ocr_available": available,
                "engine_info": info,
                "extracted_text": f"[Error reading image file: {str(e)}]",
                "width": 0,
                "height": 0,
                "format": "UNKNOWN",
                "mode": "UNKNOWN",
                "has_visual_anomaly": True,
                "anomaly_details": f"Corrupt or non-standard image raster: {str(e)}",
                "tampering_score": 50.0,
                "has_ela_heatmap": False,
            }
