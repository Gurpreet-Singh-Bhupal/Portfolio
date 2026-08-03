import { publicAssetUrl } from '../utils/publicAssetUrl'

export type NavItem = {
  id: string
  label: string
  href: string
}

/** Single-page section anchors (no React Router in v1). */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

/** Fallback if `pdfPath` is missing from Resume frontmatter. */
export const RESUME_PDF_HREF = publicAssetUrl('/GurpreetSinghResume_Tech_new2026.pdf')

/** Prefer resume frontmatter `pdfPath`; fall back to default public PDF. */
export function getResumePdfHref(pdfPath?: string | null): string {
  const path = pdfPath?.trim()
  return path && path.length > 0 ? publicAssetUrl(path) : RESUME_PDF_HREF
}
