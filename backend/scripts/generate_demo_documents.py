import io
import os
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

SAMPLE_DIR = Path(__file__).resolve().parent.parent / "sample_docs"
SAMPLE_DIR.mkdir(parents=True, exist_ok=True)

def create_pdf(
    filename: str,
    title: str,
    ref_no: str,
    institution: str,
    academic_year: str,
    validity: str,
    intake: int,
    land: float = 5.25,
    note: str = ""
):
    path = SAMPLE_DIR / filename
    c = canvas.Canvas(str(path), pagesize=letter)
    width, height = letter

    # Outer border
    c.setStrokeColor(colors.HexColor("#1e3a8a"))
    c.setLineWidth(1.5)
    c.rect(35, 35, width - 70, height - 70)

    # Header
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawCentredString(width / 2, height - 70, title)

    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#64748b"))
    c.drawCentredString(width / 2, height - 85, "GOVERNMENT OF MAHARASHTRA · STATUTORY APPROVALS BUREAU")

    c.setStrokeColor(colors.HexColor("#cbd5e1"))
    c.setLineWidth(0.8)
    c.line(55, height - 95, width - 55, height - 95)

    # Metadata Row
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#1e293b"))
    c.drawString(60, height - 120, f"Order Ref No: {ref_no}")
    c.drawString(width - 220, height - 120, "Date: 18-April-2026")

    # Body Text
    text = c.beginText(60, height - 155)
    text.setFont("Helvetica", 10)
    text.setLeading(18)
    text.setFillColor(colors.HexColor("#334155"))

    lines = [
        f"Institution: {institution} (PID: 1-412098)",
        f"Subject: Statutory Compliance & Affiliation Clearance for Academic Cycle {academic_year}",
        "",
        f"Sanctioned Programme Intake: Approved Intake: {intake} seats.",
        f"Statutory Validity Period: Valid strictly up to {validity}.",
        f"Campus Land Record: Survey No. 881/B with total contiguous area of {land} acres.",
        "",
        "This statutory order is issued under the AICTE Approval Process Handbook (APH 2024-27).",
        "The institution affirms adherence to student-to-faculty cadre and infrastructure norms.",
    ]
    if note:
        lines.append(f"SPECIAL CLAUSE: {note}")

    for line in lines:
        text.textLine(line)
    c.drawText(text)

    # Signatures
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(60, 90, "[SEAL: Statutory Approvals Authority]")
    c.drawString(width - 220, 90, "Registrar & Member Secretary")
    c.setFont("Helvetica", 8)
    c.drawString(width - 220, 75, "Digitally Signed via PKI Class-3 DSC")

    c.save()
    print(f"Generated: {filename}")

def create_image(filename: str, header: str, ref: str, ay: str, intake: str, tampered: bool = False):
    path = SAMPLE_DIR / filename
    img = Image.new("RGB", (1000, 1300), color=(255, 255, 255))
    d = ImageDraw.Draw(img)

    # Border
    d.rectangle([(25, 25), (975, 1275)], outline=(30, 58, 138), width=3)

    # Header
    d.text((100, 70), header, fill=(15, 23, 42))
    d.text((100, 120), f"REF NUMBER: {ref}", fill=(30, 41, 59))
    d.text((100, 160), f"ACADEMIC YEAR: {ay}", fill=(30, 41, 59))
    d.text((100, 200), f"INTAKE SANCTION: {intake}", fill=(30, 41, 59))
    d.text((100, 250), "OFFICIAL MUNICIPAL & REVENUE REGISTRATION RECORD", fill=(71, 85, 105))

    # Stamp / Seal
    d.ellipse([(650, 900), (900, 1150)], outline=(180, 20, 20), width=4)
    d.text((700, 1010), "OFFICIAL SEAL", fill=(180, 20, 20))
    d.text((680, 1040), "MUNICIPAL REGISTRY", fill=(180, 20, 20))

    if tampered:
        # Simulate visual splicing / compression artifact in seal area
        seal_crop = img.crop((640, 890, 910, 1160))
        # Save as very low quality JPEG and paste back to create massive ELA variance
        buf = io.BytesIO()
        seal_crop.save(buf, format="JPEG", quality=20)
        buf.seek(0)
        bad_seal = Image.open(buf)
        img.paste(bad_seal, (640, 890))
        # Draw altered text over it
        d = ImageDraw.Draw(img)
        d.text((100, 320), "MODIFIED INTAKE CLAUSE: 999 SEATS [ALTERED VIA OVERLAY]", fill=(200, 0, 0))

    img.save(str(path))
    print(f"Generated Image: {filename}")

def create_corrupt_file(filename: str):
    path = SAMPLE_DIR / filename
    # Broken header and truncated binary bytes
    with open(path, "wb") as f:
        f.write(b"%PDF-1.4\n%Malformed Truncated Header \x00\x01\x02\xff\xfe CORRUPT_EOF")
    print(f"Generated Corrupt File: {filename}")

def main():
    print("Generating demo document suite...")

    # ========================================================
    # 1. DOCUMENTS THAT WILL RUN & PASS (CLEAN / COMPLIANT)
    # ========================================================
    create_pdf(
        "affiliation_order_valid_2026.pdf",
        "UNIVERSITY AFFILIATION CONTINUATION ORDER",
        "MSTU/AFFIL/ENGG/2026/042",
        "Meridian Institute of Technology",
        "2026-27",
        "30th June 2027",
        180,
        5.25,
        "Provisional affiliation continuation granted for prospective academic year 2026-2027 under APH Clause 2.4.1."
    )

    create_pdf(
        "fire_safety_noc_compliant.pdf",
        "MUNICIPAL FIRE BRIGADE LIFE & SAFETY CLEARANCE CERTIFICATE",
        "PMC/FIRE-NOC/2026/0892",
        "Meridian Institute of Technology",
        "2026-27",
        "31st May 2027",
        180,
        5.25,
        "Form 4B verified: Operational wet riser system, yard hydrant network and dual egress escape stairways certified."
    )

    create_pdf(
        "land_conversion_verified_deed.pdf",
        "DISTRICT REVENUE OFFICE · NON-AGRICULTURAL CONVERSION ORDER",
        "REV/LND/CONV/2022/881-B",
        "Meridian Institute of Technology",
        "2026-27",
        "Permanent NA Order",
        180,
        5.25,
        "Sanctioned for permanent educational use. 5.25 contiguous acres free from encumbrance conforming to APH Clause 4.1."
    )

    create_pdf(
        "faculty_cadre_compliance_declaration.pdf",
        "AICTE STATUTORY FACULTY CADRE & INTAKE RATIO DECLARATION",
        "MIT/FACULTY-CADRE/2026/01",
        "Meridian Institute of Technology",
        "2026-27",
        "30th June 2027",
        180,
        5.25,
        "Faculty cadre verified: 1:2:6 ratio maintained across Computer Science and Engineering department (54 approved faculty)."
    )

    create_image(
        "scanned_ocr_valid_fire_noc.png",
        "MUNICIPAL CORPORATION FIRE SAFETY CERTIFICATE (SCANNED OCR)",
        "NOC-FIRE-PUNE-2026-991",
        "2026-27",
        "180 seats",
        tampered=False
    )

    # ========================================================
    # 2. DOCUMENTS THAT WILL FAIL (TRIGGER DEFICIENCIES / TAMPERING)
    # ========================================================
    create_pdf(
        "affiliation_order_expired_2024.pdf",
        "PROVISIONAL AFFILIATION ORDER (EXPIRED)",
        "MSTU/AFFIL/ENGG/2024/098",
        "Meridian Institute of Technology",
        "2024-25",
        "30th June 2025 (EXPIRED)",
        120,
        3.25,
        "CRITICAL: Order expired on 30-June-2025. Mandatory renewal for AY 2026-27 is not on record."
    )

    create_pdf(
        "intake_approval_discrepancy_360.pdf",
        "STATE ADMISSIONS COMMITTEE SEAT MATRIX ALLOCATION",
        "SAC/SEATS/2026/DISCREPANT-360",
        "Meridian Institute of Technology",
        "2026-27",
        "30th June 2027",
        360,
        5.25,
        "Intake mismatch: Recognized 360 seats, creating an irreconcilable delta against institutional Part-A declaration (180 seats)."
    )

    create_image(
        "tampered_seal_conversion_order.png",
        "REVENUE NA ORDER (FORENSIC TAMPERING TEST BENCH)",
        "REV/SUSPICIOUS/2012/142-TAMPERED",
        "2026-27",
        "999 seats",
        tampered=True
    )

    create_corrupt_file("malformed_corrupt_file.pdf")

    # Re-used duplicate document (exact byte copy to trigger SHA-256 duplicate alert)
    src_valid = SAMPLE_DIR / "affiliation_order_valid_2026.pdf"
    dup_path = SAMPLE_DIR / "duplicate_hash_reused_order.pdf"
    with open(src_valid, "rb") as f_in, open(dup_path, "wb") as f_out:
        f_out.write(f_in.read())
    print("Generated Duplicate Document: duplicate_hash_reused_order.pdf")

    print("\nCompleted: All 10 demonstration documents generated successfully!")

if __name__ == "__main__":
    main()
