export type FontOptionId = 'professional' | 'times' | 'lucida'

export type FontOption = {
  id: FontOptionId
  /** Short name shown on the Change Font button */
  label: string
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'professional', label: 'Professional (Resume)' },
  { id: 'times', label: 'Times New Roman' },
  { id: 'lucida', label: 'Lucida Handwriting' },
]

const FONT_KEY = 'portfolio.font'
const DEFAULT_FONT: FontOptionId = 'professional'

function canUseDom(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function getStoredFont(): FontOptionId | null {
  if (!canUseDom()) return null
  try {
    const value = window.localStorage?.getItem?.(FONT_KEY)
    if (value === 'professional' || value === 'times' || value === 'lucida') return value
    return null
  } catch {
    return null
  }
}

export function resolveFont(): FontOptionId {
  return getStoredFont() ?? DEFAULT_FONT
}

export function getFontOption(id: FontOptionId): FontOption {
  return FONT_OPTIONS.find((opt) => opt.id === id) ?? FONT_OPTIONS[0]
}

export function applyFont(id: FontOptionId): void {
  if (!canUseDom()) return
  document.documentElement?.setAttribute?.('data-font', id)
  try {
    window.localStorage?.setItem?.(FONT_KEY, id)
  } catch {
    /* ignore */
  }
}

/** Cycle to the next font option and return it. */
export function cycleFont(current: FontOptionId): FontOptionId {
  const index = FONT_OPTIONS.findIndex((opt) => opt.id === current)
  const next = FONT_OPTIONS[(index + 1) % FONT_OPTIONS.length] ?? FONT_OPTIONS[0]
  applyFont(next.id)
  return next.id
}
