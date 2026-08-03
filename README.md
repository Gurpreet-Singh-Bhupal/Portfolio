# Portfolio

Personal portfolio website built with **React 18 + Vite 5 + TypeScript + Tailwind CSS**.

## Requirements

- Node.js 18+ (Node 20+ recommended)

## Scripts

```bash
npm install
npm run dev      # local development server
npm run build    # production build
npm run preview  # preview the production build
```

## Stack (v1)

- React 18 + Vite 5 + TypeScript
- Tailwind CSS (one theme)
- EmailJS for Contact → Gmail (keys in `.env`)
- Content from `docs/Resume/Resume.md` (not hardcoded in components)
- Resume PDF at `public/resume.pdf`

## Important docs

| File | Purpose |
|------|---------|
| `docs/Resume/Resume.md` | Edit your resume content here |
| `docs/Resume/README.md` | How to update PDF + EmailJS |
| `src/PORTFOLIO_ARCHITECTURE.md` | Product / architecture brief |
| `ReadmeProject.md` | What each file is for |
| `ProjectMemory.md` | Change log / AI handoff |

## EmailJS setup (Contact → Gmail)

1. Copy `.env.example` → `.env`
2. Add your EmailJS service/template/public keys
3. Connect the EmailJS service to your Gmail
4. Restart `npm run dev`

See `docs/Resume/README.md` for full steps.
