import sys
from docx import Document
from docx2pdf import convert
from datetime import date
import os
import time  # for the wait

# --- check if company name was passed ---
if len(sys.argv) < 2:
    print("Error: No company name provided.")
    time.sleep(5)
    sys.exit(1)

company = sys.argv[1].strip()
if not company:
    print("Error: Company name is empty.")
    time.sleep(50)
    sys.exit(1)

# --- template path ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(BASE_DIR, "cover_template.docx")

# --- check template exists ---
if not os.path.exists(TEMPLATE):
    print(f"Error: Template not found at {TEMPLATE}")
    time.sleep(50)
    sys.exit(1)

# --- load template ---
doc = Document(TEMPLATE)
today = date.today().strftime("%d.%m.%Y")

def replace_placeholder(paragraph, placeholder, value):
    full_text = "".join(run.text for run in paragraph.runs)
    if placeholder not in full_text:
        return
    first_run = paragraph.runs[0]
    for run in paragraph.runs[1:]:
        run.text = ""
    first_run.text = full_text.replace(placeholder, value)

for p in doc.paragraphs:
    replace_placeholder(p, "{{CompanyName}}", company)
    replace_placeholder(p, "{{Date}}", today)

# --- save files ---
docx_file = os.path.join(BASE_DIR, f"CoverLetter.docx")
pdf_file = os.path.join(BASE_DIR, f"CoverLetter.pdf")

doc.save(docx_file)
convert(docx_file, pdf_file)

print(f"PDF created successfully: {pdf_file}")
time.sleep(5)  # wait 5 seconds before closing
