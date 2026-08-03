# ProjectMemory — Change Log

Living memory of this portfolio project.  
**Update on every prompt** (small or major change). Newest entries go at the top under Today / current date.

---

## How to use

- Read this file at the start of work to recall what already exists.
- After every change, add a short entry: what changed, why, which files.
- Keep language simple so you can explain the project to others.
- **AI / Cursor handoff:** You can paste or attach this file (plus `ReadmeProject.md`) in a new Cursor chat or another AI tool so it understands what has been done so far without re-explaining everything.

---

## Current project snapshot (as of 2026-08-01)

| Area | Status |
|------|--------|
| Stack | React 18 + Vite 5 + TypeScript + Tailwind CSS |
| Theme | Gold/yellow accent; day/night toggle + **font cycle** (Professional / Times / Lucida) |
| App UI | Full sections + click-to-upload profile photo + mobile Menu + Reveal animations |
| Social | LinkedIn + GitHub from Resume.md frontmatter; project GitHub aligned |
| Content | Driven by real `docs/Resume/Resume.md` (parser matches your heading format) |
| Resume PDF | `public/GurpreetSinghResume_Tech_new2026.pdf` (Download / Open working) |
| Profile photo | Icon placeholder → click upload (localStorage); optional `photoPath` in Resume.md |
| Responsive | Tuned for mobile / tablet / laptop (mobile Menu below lg, fluid type/spacing) |
| Motion | Framer Motion `Reveal` (respects `prefers-reduced-motion`) |
| Contact | EmailJS parked; **Send via email app** (mailto) + **Open in Gmail** (Chrome) |
| Routing | None (section IDs + smooth scroll) — Router postponed |
| SEO | Basic meta/OG in `index.html` + `robots.txt` / `sitemap.xml` |
| Deployment | **GitHub Pages** — Actions workflow; URL `https://Gurpreet-Singh-Bhupal.github.io/portfolio/` |
| Docs | Architecture, Resume guide, `README.md`, `ReadmeProject.md`, `ProjectMemory.md` |

---

## Change log

### 2026-08-03 — GitHub Pages deploy setup

**What:** Vite `base: /portfolio/` for production build; `publicAssetUrl()` for PDF/photo paths; GitHub Actions workflow `.github/workflows/deploy-pages.yml`; Live URL in Resume.md + sitemap.

**Why:** User chose GitHub Pages over Vercel — static site fits; repo already on GitHub.

**Files:** `vite.config.ts`, `src/utils/publicAssetUrl.ts`, `src/constants/nav.ts`, `src/hooks/useProfilePhoto.ts`, `.github/workflows/deploy-pages.yml`, `docs/Resume/Resume.md`, `public/sitemap.xml`, `ProjectMemory.md`, `ReadmeProject.md`

**User action:** Repo → Settings → Pages → Source: **GitHub Actions**; push this commit; wait for Actions green check.

---

### 2026-08-03 — Git remote `origin` added (push needs user auth)

**What:** `git remote add origin https://github.com/Gurpreet-Singh-Bhupal/portfolio.git`. Push failed in agent shell (GitHub login dialog). Added `.cursor/fuse-overlay/` to `.gitignore`.

**Why:** User `git push` error: `'origin' does not appear to be a git repository`.

**Files:** `.gitignore`, `ProjectMemory.md`

---

### 2026-08-03 — Hero photo: keep turban, hide side black bars

**What:** Reverted uniform zoom; use horizontal-only scale (`scale-x`) + higher object position so turban stays visible while passport black side edges clip inside circle.

**Files:** `src/components/Common/ProfilePhoto.tsx`, `ProjectMemory.md`

---

### 2026-08-03 — Hero profile photo crop (hide black edges)

**What:** Slightly smaller hero photo circle; image scaled ~14% inside circle to clip black borders on `pssprt.jpg`.

**Files:** `src/components/Common/ProfilePhoto.tsx`, `ProjectMemory.md`

---

### 2026-08-03 — Profile photo: Hero only + photoPath fix

**What:** Fixed `photoPath` to `/pssprt.jpg` (public URL, not Windows path). Removed `ProfilePhoto` from About section. Hero intro: photo centered on mobile above text; text left / photo right on desktop; portrait crop `object-[center_20%]`.

**Why:** User added photo via `photoPath` and wanted it only in intro (Hero), not About.

**Files:** `docs/Resume/Resume.md`, `src/components/Hero/Hero.tsx`, `src/components/About/About.tsx`, `src/components/Common/ProfilePhoto.tsx`, `src/hooks/useProfilePhoto.ts`, `ReadmeProject.md`, `ProjectMemory.md`

---

### 2026-08-03 — Deploy plan: Git push + Vercel (guided)

**What:** User asked how to push repo to GitHub and host live. Confirmed: no `.git` yet; `npm run build` passes; Git installed; `gh` CLI not installed. Recommended **Vercel** over GitHub Pages/Netlify for easiest Vite deploy (no `base` path config). Step-by-step push + Vercel connect instructions provided.

**Why:** Static React portfolio — no DB; friend-style hosting; free tier sufficient on any platform.

**Files:** `ProjectMemory.md` (this note)

---

### 2026-08-03 — GitHub links aligned

**What:** Set real GitHub profile in Resume frontmatter (`https://github.com/Gurpreet-Singh-Bhupal`); updated Portfolio Projects GitHub to `https://github.com/Gurpreet-Singh-Bhupal/portfolio`. Projects section now uses `isUsableSocialUrl` for GitHub/Live links (hides placeholders like `YOUR_PORTFOLIO`).

**Why:** User asked to align GitHub links across Hero, Contact, Footer, and Projects — same validation as LinkedIn.

**Files:** `docs/Resume/Resume.md`, `src/components/Projects/Projects.tsx`, `docs/Resume/README.md`, `ReadmeProject.md`, `ProjectMemory.md`

---

### 2026-08-02 — Font button hover label + Open in Gmail for Chrome

**What**
- Font button text is **Change font**; hover/focus shows current font name; tooltip title is **Change font**.
- Contact: kept **Send via email app** (`mailto` / OS picker). Added **Open in Gmail** (Gmail compose URL) because choosing Chrome in the Windows mailto picker does not open Gmail compose.
- Clarified help text + docs for both send paths.

**Why**
- Match font UX request; Chrome-from-mailto is an OS/browser limitation, so provide a working Gmail path.

**Files**
- `src/components/Common/FontToggle.tsx`, `src/utils/font.ts`
- `src/services/email.ts`, `src/components/Contact/Contact.tsx`
- `docs/Resume/README.md`, `ReadmeProject.md`, `ProjectMemory.md`

---

### 2026-08-02 — Mailto picker + Subject field + changeFont label

**What**
- Contact **Send Message** again uses `mailto:` so Windows shows the app-selection popup (not direct Gmail URL).
- Added required **Subject** field; mailto fills To / Subject / Body (name, from email, message).
- Font control shows a **changeFont** label beside the font button (compact on small screens).
- Updated Contact help text + Resume README for this flow.

**Why**
- User wants OS picker → chosen mail app → authenticated compose like normal email (screenshot 2 → 3), plus subject + clearer font control label.

**Files**
- `src/services/email.ts`, `src/components/Contact/Contact.tsx`
- `src/components/Common/FontToggle.tsx`
- `docs/Resume/README.md`, `ReadmeProject.md`, `ProjectMemory.md`

**Note**
- Compose quality depends on the selected app (Outlook works best). Chrome as mailto handler only works if configured as the system mailto handler.

---

### 2026-08-02 — Contact Gmail compose, Lucida nav, Skills hover, larger type, motion

**What**
1. **Contact:** Replaced broken Windows `mailto` app-picker flow with **Gmail web compose** (`window.open`) so To/subject/body open prefilled; clipboard fallback if popup blocked. EmailJS still parked.
2. **Lucida font:** Navbar no longer ellipsis-truncates the name (wraps instead); shorter font button label (`Lucida`); controls stay on one row (`flex-nowrap`); slightly smaller Lucida nav type for fit.
3. **Skills:** Card layout with skill counts; richer Backend/Database/Tools lists in Resume.md; tags lift with **yellow 3D-ish shadow** on hover.
4. **Typography:** Larger/bolder/darker body + Experience/Hero/About/Projects text for 100% zoom readability; muted color darkened.
5. **Animations:** Stronger Reveal (blur+rise); skill cards stagger; project/experience cards hover lift.

**Why**
- Fix reported UX bugs from screenshots and make the site feel denser, clearer, and more HR-friendly.

**Files**
- `src/services/email.ts`, `src/components/Contact/Contact.tsx`
- `src/components/Navbar/Navbar.tsx`, `FontToggle.tsx`, `src/utils/font.ts`
- `src/components/Skills/Skills.tsx`, `Experience`, `Hero`, `About`, `Projects`, `Reveal`
- `src/index.css`, `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `ReadmeProject.md`, `ProjectMemory.md`

---

### 2026-08-01 — Social links, font switcher, Contact parked (mailto interim)

**What**
1. **LinkedIn** from `Resume.md` wired on Hero / Contact / Footer (`isUsableSocialUrl`).
2. **GitHub** in Resume.md is incomplete (`https://github.com/` / placeholder) — link hidden until a full profile URL is set (e.g. `https://github.com/your-username`).
3. **Font toggle** in Navbar: cycles **Professional (Resume)** → **Times New Roman** → **Lucida Handwriting**; button shows active font name (`data-font` + localStorage).
4. **Contact feasibility:** true silent EmailJS → Gmail needs EmailJS account + `.env` keys (not present) — **parked**. Interim: Send Message opens mailto to `gurpreetOfficial0596@gmail.com` with name/from/message prefilled.

**Why**
- Use real LinkedIn now; avoid broken GitHub link; give HR-facing font choice; keep contact usable without blocking on EmailJS setup.

**Files**
- `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `src/utils/{socialLinks,font}.ts`, `src/hooks/useFont.ts`
- `src/components/Common/FontToggle.tsx`, Navbar, Hero, Footer, Contact
- `src/services/email.ts`, `src/index.css`, `index.html`
- `ReadmeProject.md`, `ProjectMemory.md`

**Your action**
- Set full GitHub URL in Resume.md frontmatter when ready.
- Later: EmailJS setup together for true in-browser send.

---

### 2026-08-01 — Photo upload, theme toggle, motion, Tailwind/responsive pass

**What**
1. **Profile photo:** person icon + “Add photo”; click opens file picker; upload previews immediately and persists in `localStorage` (Hero + About stay in sync). Optional Resume.md `photoPath` still works. Remove uploaded photo control when applicable.
2. **Day/night toggle:** moon/sun button in Navbar (was missing before — only OS preference). Uses `html.dark` + `portfolio.theme` localStorage; FOUC-safe script in `index.html`.
3. **Animations:** Framer Motion `Reveal` on sections (subtle fade/slide); skipped when user prefers reduced motion.
4. **Tailwind-first:** layout/UI via utilities; `index.css` kept to theme tokens + `@layer base` `@apply` only.
5. **Responsive:** mobile Menu panel, fluid type/spacing, tablet/laptop grids; lint + build clean.

**Why**
- HR-friendly polish, usable theme control, clear photo UX without a backend, and stable look across devices.

**Files**
- `src/components/Common/{ProfilePhoto,ThemeToggle,Reveal}.tsx`
- `src/hooks/{useTheme,useProfilePhoto}.ts`, `src/utils/{theme,profilePhotoStorage}.ts`
- `src/components/{Navbar,Hero,About,Skills,Experience,Projects,Resume,Contact}/*`
- `src/index.css`, `tailwind.config.js` (`darkMode: 'class'`), `index.html`
- `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `ReadmeProject.md`, `ProjectMemory.md`
- dependency: `framer-motion`

---

### 2026-08-01 — Yellow theme (light+dark), profile photo slot, safer Cursor rules

**What**
- Theme: professional gold/yellow accent for light and dark (dark = near-black canvas, yellow borders/highlights; not neon).
- Added `--color-on-accent` + shared `BTN_PRIMARY_CLASS` so CTAs stay readable on yellow.
- Profile photo: there was **no** photo UI before; added shared `ProfilePhoto` in **Hero** and **About**, driven by `photoPath` in `Resume.md` (`/profile.jpg` → put file in `public/`).
- Extended `.cursor/rules/portfolio-docs-memory.mdc` with safe-change rules (don’t break existing code/flows, minimal diffs, reuse, optional chaining, ESLint/build safety) and clarified ReadmeProject vs ProjectMemory roles.
- Reused `getResumePdfHref` for PDF links; lint + build clean.

**Why**
- Favorite color yellow without looking cheap; support day/night; clear place to drop a profile photo; stronger AI/dev guardrails.

**Files**
- `src/index.css`, `tailwind.config.js`, `src/constants/theme.ts`, `src/constants/nav.ts`
- `src/components/Common/ProfilePhoto.tsx`, Hero, About, Navbar, Resume, Contact
- `src/types/resume.ts`, `src/utils/parseResumeMarkdown.ts`
- `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `.cursor/rules/portfolio-docs-memory.mdc`
- `ReadmeProject.md`, `ProjectMemory.md`

**Your action**
- Add `public/profile.jpg` (or change `photoPath`). Toggle OS light/dark to preview both themes.

---

### 2026-08-01 — Resume.md is now the live content source

**What**
- Reviewed real `docs/Resume/Resume.md` (Gurpreet Singh Bhupal).
- Updated parser/types to match its format (`#` sections, job → project nesting, labeled Description/Responsibilities/Technologies blocks, phone lists, dual emails).
- Wired About / Experience / Contact / Resume UI to show parsed achievements, certifications, languages, nested projects, education, phones.
- Fixed `pdfPath` to `/GurpreetSinghResume_Tech_new2026.pdf` (real PDF already in `public/`).
- Updated `docs/Resume/README.md` to document the real heading format.

**Why**
- Start the working content flow from the resume file you maintain, without rewriting it into a different template.

**Verified parse**
- 4 jobs / 6 client projects, 4 skill groups, portfolio project, 3 education entries, achievements/certs/languages all loading.
- `npm run build` succeeded.

**Still placeholders for you**
- LinkedIn + GitHub URLs in frontmatter
- Portfolio GitHub / Live URLs
- EmailJS `.env` keys for Gmail form delivery

**Files**
- `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `src/utils/parseResumeMarkdown.ts`, `src/types/resume.ts`, `src/data/*`
- `src/components/About`, `Experience`, `Contact`, `Resume`
- `ProjectMemory.md`, `ReadmeProject.md`

---

### 2026-08-01 — Clarified “what’s next” (no need to re-paste architecture)

**What**
- Confirmed: do **not** restart from `PORTFOLIO_ARCHITECTURE.md` part-by-part for phases already done.
- Next focus: real content + EmailJS/PDF setup (your side), then Phase 6 polish (motion, visual refinement, Lighthouse, deploy).

**Why**
- Phases 1–5 shell (foundation through Contact/Footer) already exists; avoid rebuilding from the brief.

**Files**
- `ProjectMemory.md` (this note only)

---

### 2026-08-01 — Architecture review applied + foundation + resume/contact

**What**
- Revised `src/PORTFOLIO_ARCHITECTURE.md` to v1.1 decisions: React 18, skip Router, skills as tags, one theme first, a11y + honest SPA SEO, EmailJS `.env` note, content from `docs/Resume/`.
- Phase 2 foundation: Tailwind CSS, folder structure (`components`, `data`, `types`, `constants`, `services`, `utils`, `hooks`), one theme tokens in `src/index.css`.
- Added `docs/Resume/Resume.md` as content source of truth + README for PDF/EmailJS setup.
- Wired typed parser (`src/utils/parseResumeMarkdown.ts`) so sections render from the resume file (not hardcoded copy).
- Resume Download/Open uses `public/resume.pdf` (placeholder PDF included).
- Contact form sends via EmailJS when `VITE_EMAILJS_*` are set; shows setup hint + mailto/LinkedIn fallbacks otherwise.
- Added `.env.example`; ensured `.env` is gitignored.
- Production build verified (`npm run build` OK).

**Why**
- Lock architecture decisions before more UI polish.
- Make content edits simple (edit markdown + replace PDF).
- Make resume download and Gmail contact actually work once personal PDF + EmailJS keys are added.

**Files**
- `src/PORTFOLIO_ARCHITECTURE.md`
- `docs/Resume/Resume.md`, `docs/Resume/README.md`
- `public/resume.pdf`, `public/robots.txt`, `public/sitemap.xml`
- `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `index.html`
- `src/components/**`, `src/data/**`, `src/types/resume.ts`, `src/utils/parseResumeMarkdown.ts`
- `src/constants/**`, `src/services/email.ts`
- `tailwind.config.js`, `postcss.config.js`, `package.json`, `.env.example`, `.gitignore`
- `README.md`, `ReadmeProject.md`, `ProjectMemory.md`
- Removed unused `src/App.css`

**Your next steps (manual)**
1. Edit `docs/Resume/Resume.md` with your real info (set Gmail in frontmatter `email`).
2. Replace `public/resume.pdf` with your real PDF.
3. Copy `.env.example` → `.env`, add EmailJS keys linked to Gmail, restart `npm run dev`.

---

### 2026-08-01 — Clarified ProjectMemory as AI handoff context

**What**
- Confirmed that `ProjectMemory.md` is meant to be shared later with Cursor or any other AI tool/model so it can understand project history.
- Documented that intent in this file and in `ReadmeProject.md`.

**Why**
- Make the change log useful across sessions and tools, not only for the human reader.

**Files**
- `ProjectMemory.md` (updated)
- `ReadmeProject.md` (updated)

---

### 2026-08-01 — Add project documentation files

**What**
- Created `ReadmeProject.md` to explain what each important file and code block does.
- Created `ProjectMemory.md` (this file) as a running change log.
- Added Cursor rule `.cursor/rules/portfolio-docs-memory.mdc` so both docs are updated on every prompt.

**Why**
- Make it easy to remember structure and history between chats.
- Support explaining the project in simple terms.

**Files**
- `ReadmeProject.md` (new)
- `ProjectMemory.md` (new)
- `.cursor/rules/portfolio-docs-memory.mdc` (new)

---

### 2026-08-01 — Initial project setup

**What**
- Scaffolded React + Vite + TypeScript project in `c:\VFRO\Projects\Portfolio`.
- Replaced default Vite demo UI with a clean portfolio shell:
  - Header with brand placeholder + nav
  - Hero section
  - About / Projects / Contact placeholder sections
- Renamed package to `portfolio`.
- Set page title to **Portfolio**.
- Verified production build (`npm run build` succeeded).
- Wrote short `README.md` with run scripts.

**Why**
- Start a portfolio site that can grow step by step into a professional site and be deployed later.
- Keep TypeScript at a basic–intermediate level that is easy to understand and explain.

**Files**
- `package.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`
- `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`
- `README.md`
- Dependencies installed via public npm registry (corporate registry did not have `create-vite`)

**Notes**
- Node version on machine: v18.20.3 (Vite 5 compatible; latest create-vite needed Node 20+, so create-vite@5.5.5 was used).
- No encrypted persona rule files were found in the workspace at setup time.

---

## Next planned (not done yet)

- Replace placeholder resume content + real PDF
- Configure EmailJS `.env` for Gmail delivery
- Visual polish / Framer Motion (phase 6)
- Optional: project case-study pages (Router), theme toggle
- Deployment (GitHub → Vercel)
