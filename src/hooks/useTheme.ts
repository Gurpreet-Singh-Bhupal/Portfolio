import { useCallback, useEffect, useState } from 'react'
import { applyTheme, resolveTheme, toggleTheme, type ThemeMode } from '../utils/theme'

/** Day/night theme with localStorage + class on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => resolveTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => toggleTheme(current))
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
