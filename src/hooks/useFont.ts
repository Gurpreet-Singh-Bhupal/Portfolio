import { useCallback, useEffect, useState } from 'react'
import {
  applyFont,
  cycleFont,
  getFontOption,
  resolveFont,
  type FontOptionId,
} from '../utils/font'

/** Cycles Professional → Times New Roman → Lucida Handwriting. */
export function useFont() {
  const [fontId, setFontId] = useState<FontOptionId>(() => resolveFont())
  const option = getFontOption(fontId)

  useEffect(() => {
    applyFont(fontId)
  }, [fontId])

  const cycle = useCallback(() => {
    setFontId((current) => cycleFont(current))
  }, [])

  return { fontId, label: option.label, cycle }
}
