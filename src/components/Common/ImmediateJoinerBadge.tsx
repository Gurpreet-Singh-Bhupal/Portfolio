type ImmediateJoinerBadgeProps = {
  className?: string
  label?: string
}

/** Availability pill shown below the hero profile photo. */
export function ImmediateJoinerBadge({
  className = '',
  label = 'Immediate joiner',
}: ImmediateJoinerBadgeProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/45 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-300 sm:text-sm ${className}`}
      role="status"
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.85)]"
      />
      {label}
    </p>
  )
}
