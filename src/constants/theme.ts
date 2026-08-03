/**
 * Theme tokens used by `src/index.css` and Tailwind.
 * Accent is professional gold/yellow in both light and dark (via prefers-color-scheme).
 */
export const THEME = {
  colors: [
    'canvas',
    'surface',
    'ink',
    'muted',
    'accent',
    'on-accent',
    'accent-soft',
    'line',
  ] as const,
  fonts: {
    display: 'Fraunces',
    sans: 'Sora',
  },
} as const

/** Shared primary button classes (yellow/gold accent, readable on-accent text). */
export const BTN_PRIMARY_CLASS =
  'rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60'
