const THEME_KEY = 'portfolio.theme'
export type ThemeMode = 'light' | 'dark'

function canUseDom(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function getStoredTheme(): ThemeMode | null {
  if (!canUseDom()) return null
  try {
    const value = window.localStorage?.getItem?.(THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function getSystemTheme(): ThemeMode {
  if (!canUseDom()) return 'light'
  try {
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function resolveTheme(): ThemeMode {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(mode: ThemeMode): void {
  if (!canUseDom()) return
  const root = document.documentElement
  root?.classList?.toggle?.('dark', mode === 'dark')
  root?.style?.setProperty?.('color-scheme', mode)
  try {
    window.localStorage?.setItem?.(THEME_KEY, mode)
  } catch {
    /* ignore quota / private mode */
  }
}

export function toggleTheme(current: ThemeMode): ThemeMode {
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
