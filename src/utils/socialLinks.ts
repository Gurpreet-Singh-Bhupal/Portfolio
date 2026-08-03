/** True when a social URL looks usable (not empty, not a bare domain, not a placeholder). */
export function isUsableSocialUrl(url?: string | null): boolean {
  const value = url?.trim()
  if (!value) return false
  if (/YOUR_/i.test(value)) return false

  try {
    const parsed = new URL(value)
    if (!/^https?:$/i.test(parsed.protocol)) return false
    const host = parsed.hostname.replace(/^www\./i, '').toLowerCase()
    const path = parsed.pathname.replace(/\/+$/, '')

    if (host === 'github.com' && (path === '' || path === '/')) return false
    if (host === 'linkedin.com' || host === 'www.linkedin.com') {
      if (!path || path === '/') return false
    }
    return true
  } catch {
    return false
  }
}
