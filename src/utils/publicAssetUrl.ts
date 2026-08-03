/** Prefix Vite `BASE_URL` so `/photo.jpg` works on GitHub Pages (`/portfolio/photo.jpg`). */
export function publicAssetUrl(path?: string | null): string {
  const trimmed = path?.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const relative = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
  return `${import.meta.env.BASE_URL}${relative}`
}
