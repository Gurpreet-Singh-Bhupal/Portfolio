import { useState } from 'react'
import { useFont } from '../../hooks/useFont'

/** Button shows “Change font”; hover reveals the current font name. Tooltip: Change font. */
export function FontToggle() {
  const { label, cycle } = useFont()
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={cycle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Change font. Current: ${label}`}
      title="Change font"
      className="inline-flex h-9 min-w-[7.5rem] shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-line bg-surface px-2.5 text-xs font-semibold text-ink transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {hovered ? label : 'Change font'}
    </button>
  )
}
