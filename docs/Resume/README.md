# Resume docs — how to update content, PDF, and email

This folder is the **source of truth** for portfolio resume content.

## Files

| File | Purpose |
|------|---------|
| `Resume.md` | Your structured resume. The site reads and parses this file. |
| `README.md` | This guide. |

The downloadable PDF lives under **`public/`** (not inside this folder), so the browser can serve it directly.

---

## 1. Update site content

1. Edit `docs/Resume/Resume.md`.
2. Keep frontmatter keys and the `# Section` headings below.
3. Save — Vite hot-reloads; the page updates from parsed data.

**Do not** hardcode long bio/job/project text inside React components.

### Frontmatter

```yaml
name: Gurpreet Singh Bhupal
title: Senior Frontend Developer
email: primary@gmail.com / secondary@gmail.com
phone:
  - "8982583673"
  - "9399652371"
location: Pune, Maharashtra, India
linkedin: https://www.linkedin.com/in/...
github: https://github.com/...
yearsExperience: 5+
pdfPath: /GurpreetSingh_Resume_Tech_aug2026.pdf
photoPath: /profile.jpg
```

Notes:

- `pdfPath` is a **public URL** (`/filename.pdf`), not `/public/...`.
- Put the real PDF file in the project `public/` folder with that same filename.
- `photoPath` is optional (static file in `public/`). You can also **click the photo circle** on the site to upload a preview (stored in the browser via localStorage). Empty `photoPath` shows a person icon + “Add photo”.

### Section headings the parser understands

| Heading in `Resume.md` | Used for |
|------------------------|----------|
| `# Summary` | Hero supporting copy |
| `# About` | About section |
| `# Interests` | Interest tags |
| `# Skills` → `## Group` | Skill chips |
| `# Professional Experience` → `## Role \| Company \| Dates` → `### Project: Name` | Experience timeline |
| `# Portfolio Projects` → `## Project Name` | Projects section |
| `# Major Achievements` | About highlights |
| `# Certifications` | About certifications |
| `# Education` → `## Degree` | Education data |
| `# Languages` | About languages |
| `# Contact` | Extra email/phone fallback |

Under each job project, use labeled blocks:

```text
Description
...
Responsibilities
- ...
Technologies
- ...
Achievements
- ...
```

---

## 2. Update the PDF download

1. Export your real resume as PDF.
2. Place it at `public/GurpreetSingh_Resume_Tech_aug2026.pdf` (or change `pdfPath` + filename together).
3. Click **Download Resume** / **Open Resume** on the site to verify.

---

## 3. Contact → Gmail (PARKED: EmailJS later)

**Status:** Direct in-browser send via EmailJS is **parked** until we set up keys together later.

**Works now:**
- **Send via email app** → `mailto:` → OS app picker (Outlook works well).
- **Open in Gmail** → Gmail web compose in the browser (use this for Chrome/Gmail; Chrome in the
  Windows mailto picker usually does **not** open Gmail).

Form fields: Name, Email (from), **Subject**, Message.

**Later (EmailJS):**
1. Create an account at [https://www.emailjs.com/](https://www.emailjs.com/).
2. Add an Email Service connected to Gmail (`gurpreetOfficial0596@gmail.com`).
3. Template vars: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`, `{{reply_to}}`.
4. Copy `.env.example` → `.env` and fill `VITE_EMAILJS_*` keys.
5. Restart `npm run dev`.

---

## Still placeholders in your file

- Portfolio **Live** URL under Portfolio Projects (`YOUR_PORTFOLIO.vercel.app`) — set when deployed
