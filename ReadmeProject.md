# ReadmeProject — What Each File Does

Use this file to understand the purpose of every important file and code block in the portfolio project.
Update this file whenever code structure, files, or responsibilities change.

---

## Project overview

| Item | Detail |
|------|--------|
| Stack | React 18 + Vite 5 + TypeScript + Tailwind CSS |
| Goal | SaaS-quality personal portfolio (single-page scroll) |
| Content source | `docs/Resume/Resume.md` (parsed into typed data) |
| Resume PDF | `public/GurpreetSinghResume_Tech_new2026.pdf` (via `pdfPath`) |
| Profile photo | Click circle to upload (localStorage) or set `photoPath` in Resume.md |
| Theme | Gold/yellow accent; day/night toggle + font cycle button |
| Social | LinkedIn + GitHub from Resume.md; project GitHub link; Live URL when deployed |
| Contact | EmailJS → your Gmail (keys in `.env`) |
| Entry URL | `npm run dev` → usually `http://localhost:5173` |

---

## Architecture decisions (v1)

Documented in `src/PORTFOLIO_ARCHITECTURE.md`:

- Keep React 18 / Vite 5 (Node 18); skip React Router for v1
- Skills as **tags/chips**, not progress bars
- Yellow/gold accent in **light and dark** with Navbar theme toggle (+ system default on first visit)
- Accessibility + honest SPA SEO notes
- EmailJS keys only in `.env`; LinkedIn/email fallbacks on Contact

---

## Root files

### `index.html`
- Browser entry page + `#root` mount.
- Meta description / Open Graph tags for basic SEO.
- Loads Google fonts (Fraunces + Sora) and `src/main.tsx`.

### `package.json`
- Scripts: `dev`, `build`, `preview`, `lint`.
- Dependencies include React 18, `@emailjs/browser`.
- Dev deps include Tailwind CSS 3, PostCSS, Autoprefixer.

### `vite.config.ts`
- Vite + React plugin.

### `tailwind.config.js`
- Scans `index.html` + `src/**/*`.
- Maps theme colors/fonts to CSS variables from `src/index.css`.

### `postcss.config.js`
- Enables Tailwind + Autoprefixer.

### `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`
- TypeScript settings for app and Node config files.

### `eslint.config.js`
- Linting rules for TypeScript/React.

### `.gitignore`
- Ignores `node_modules`, `dist`, `.env`, local env files.

### `.env.example`
- Template for EmailJS public config vars (`VITE_EMAILJS_*`).
- Copy to `.env` and fill real values (never commit `.env`).

### `README.md`
- How to run the project + short stack/setup notes.

### `ReadmeProject.md` (this file)
- Explains what each file / code block is for.

### `ProjectMemory.md`
- Chronological change log; also AI handoff context.

### `.cursor/rules/portfolio-docs-memory.mdc`
- Always update `ReadmeProject.md` (developer “what is this for?”) and `ProjectMemory.md` (Cursor change memory) on every prompt that changes the project.
- Also enforces safe-change rules: don’t break existing code/flows, minimal diffs, reuse helpers, optional chaining for env/optional data, keep ESLint clean.

---

## `docs/` — human-editable content

### `docs/Resume/Resume.md`
- **Source of truth** for Gurpreet’s portfolio content (name, about, skills, jobs/projects, education, etc.).
- Uses `#` top sections and nested `##` / `### Project:` blocks (see `docs/Resume/README.md`).
- Parsed by `src/utils/parseResumeMarkdown.ts` into typed data.

### `docs/Resume/README.md`
- How to edit resume content, PDF filename/`pdfPath`, and EmailJS → Gmail.

---

## `public/`

### `public/GurpreetSinghResume_Tech_new2026.pdf`
- Real downloadable resume PDF (referenced by `pdfPath` in `Resume.md`).

### `public/robots.txt` / `public/sitemap.xml`
- Basic SEO crawl hints for a Vite SPA.

### `public/vite.svg`
- Favicon asset referenced from `index.html`.

---

## `src/` — application code

### `src/PORTFOLIO_ARCHITECTURE.md`
- Product brief: stack decisions, section flow, phases, a11y/SEO/EmailJS notes.

### `src/main.tsx`
- Mounts `<App />` inside `#root` with `StrictMode`.

### `src/App.tsx`
- Single-page layout: Navbar → Hero → About → Skills → Experience → Projects → Resume → Contact → Footer.

### `src/index.css`
- Tailwind layers + CSS **theme tokens only** (layout stays in Tailwind classes).
- Light = `:root`; dark = `html.dark` (toggled by ThemeToggle).
- `@layer base` uses `@apply` for body/root/focus (Tailwind-first).

### `src/vite-env.d.ts`
- Vite env typings + `*.md?raw` module declaration for Resume import.

### `src/types/resume.ts`
- TypeScript shapes for resume basics (includes `photoPath`), skills, experience, projects, education, etc.

### `src/utils/parseResumeMarkdown.ts`
- Parses `Resume.md` frontmatter + sections into `ResumeData`.
- `normalizePublicPath` — maps `/public/...` → `/...` for `pdfPath` / `photoPath`.

### `src/data/resume.ts` / `src/data/index.ts`
- Imports `docs/Resume/Resume.md?raw`, parses it, exports typed data for components.

### `src/constants/nav.ts`
- `NAV_ITEMS` — section anchors.
- `getResumePdfHref(pdfPath?)` — safe PDF URL helper (optional chaining / fallback).

### `src/constants/theme.ts`
- `THEME` — token name list.
- `BTN_PRIMARY_CLASS` — shared primary button styles (reuse instead of duplicating).

### `src/utils/theme.ts`
- `resolveTheme` / `applyTheme` / `toggleTheme` — day/night helpers (localStorage + `html.dark`).

### `src/utils/profilePhotoStorage.ts`
- Persist uploaded photo data URL; broadcast change for Hero `ProfilePhoto`.

### `src/hooks/useTheme.ts`
- React hook for current theme + toggle (used by `ThemeToggle`).

### `src/hooks/useProfilePhoto.ts`
- Resolves photo: uploaded → `photoPath` → empty; exposes `upload` / `clearUpload`.

### `src/services/email.ts`
- EmailJS send helper + “is configured?” check using `VITE_EMAILJS_*` env vars.

### `src/components/*`
| Folder / file | Purpose |
|---------------|---------|
| `Navbar` | Sticky header, section links, **FontToggle**, **ThemeToggle**, mobile **Menu** (below `lg`) |
| `Hero` | Brand name, title, summary, CTAs + `ProfilePhoto` in intro + `Reveal` |
| `About` | About copy, years, location, interests, highlights, certifications (no photo) |
| `Skills` | Skill **groups + tags** (no progress bars) |
| `Experience` | Timeline with nested job projects from resume |
| `Projects` | Portfolio project list from resume; GitHub/Live links only when `isUsableSocialUrl` passes |
| `Resume` | Download + Open PDF + education list |
| `Contact` | Validated form → EmailJS; mailto/phone/LinkedIn fallbacks |
| `Footer` | Social links + copyright + back to top |
| `Common/ProfilePhoto.tsx` | Icon placeholder; click to upload/change photo |
| `Common/ThemeToggle.tsx` | Day/night switch button |
| `Common/FontToggle.tsx` | Button “Change font”; hover shows current font name; tooltip “Change font” |
| `Common/Reveal.tsx` | Framer Motion while-in-view fade/slide (a11y-aware) |

### `src/utils/font.ts` / `src/hooks/useFont.ts`
- Font options: Professional (Resume default), Times New Roman, Lucida Handwriting.
- Applies `data-font` on `<html>` and persists in `localStorage`.

### `src/utils/socialLinks.ts`
- `isUsableSocialUrl` — hides incomplete GitHub/LinkedIn/placeholder URLs.

### `src/services/email.ts` (Contact)
- Preferred inbox: `gurpreetOfficial0596@gmail.com` (fallback `gsingh5496@gmail.com`).
- EmailJS path ready but **parked** (needs `.env` keys later).
- Interim dual path: `mailto` (OS app picker / Outlook) and `buildGmailComposeUrl` (**Open in Gmail** for Chrome). Payload includes `subject` + body.

### How to add your profile photo
**Option A (easiest):** put image in `public/` and set `photoPath` in Resume.md (e.g. `/pssprt.jpg`).

**Option B:** click the circle on Hero → choose an image (saved in this browser only).  
**Option B:** put a file in `public/` and set `photoPath: /your-file.jpg` in `Resume.md`.

### `src/assets/`
- Optional bundled images (prefer click-upload or `public/` for profile photo).

---

## `dist/` (generated)

- Production build output from `npm run build`. Do not edit by hand.

---

## How to keep this file useful

When you change code:
1. Update the matching section above.
2. If you add a new file/component, add a short purpose row/section.
3. Log the change in `ProjectMemory.md` as well.
