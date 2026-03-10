# Job Application Helper Tools

Small automation tools designed to make the job application process faster.

This repository contains two components:

1. A **Python script** that generates cover letter PDFs automatically.
2. A **browser autofill script** that helps complete online job applications faster.

---

# 1. Automatic Cover Letter Generator (Python)

This script generates a cover letter PDF automatically from a Word template.

The company name is passed as a command-line argument.  
The script replaces placeholders in the template and exports a ready-to-send PDF.

## How it works

1. The script loads `cover_template.docx`
2. It replaces placeholders:
   - `{{CompanyName}}`
   - `{{Date}}`
3. The document is saved as `.docx`
4. The script converts the document to `.pdf`

## Requirements

Python 3.7+

Install required packages:

```bash
pip install python-docx docx2pdf
```

## Usage

```bash
python make_cover_pdf.py "Company Name"
```

Example:

```bash
python make_cover_pdf.py "Siemens"
```

Output:

```
CoverLetter.docx
CoverLetter.pdf
```

---

# 2. Job Application Autofill Tool (JavaScript)

A browser automation script designed to speed up filling online job application forms.

The script detects input fields and fills them automatically with predefined values.

## Features

- Auto-fills common form fields
- Detects inputs using keywords
- Automatically selects common options
- Handles privacy policy checkboxes
- Provides keyboard shortcuts
- Adds floating upload buttons

## Example field detection

- `first`, `name` → first name
- `email` → email field
- `phone`, `tel` → phone number
- `plz`, `zip` → postal code

## File Upload Shortcuts

| Key | Action |
|----|------|
| `1` | Upload CV |
| `2` | Upload Cover Letter |
| `3` | Upload Other Documents |
| `0` | Open first file input |

## Submission Shortcuts

| Key | Action |
|----|------|
| `.` | Submit form |
| `*` | Click "Apply Now" |
| `/` | Open application form |
| `-` | Apply with CV |
| `Enter` | Click main apply button |

## Requirements

Modern browser (Chrome / Edge / Firefox)

The script can run inside a browser extension or be injected into a page.

---

# Learning Purpose

This project was created to practice:

- Python scripting
- JavaScript DOM manipulation
- browser automation
- working with templates
- Git and GitHub project structure

---

# Author

MAB