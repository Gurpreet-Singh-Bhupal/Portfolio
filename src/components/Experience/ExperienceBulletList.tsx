type ExperienceBulletListProps = {
  items: string[]
  className?: string
  variant?: 'default' | 'achievement'
}

/** Bullet rows with spacing + divider lines (font-safe marker, not unicode triangles). */
export function ExperienceBulletList({
  items,
  className = '',
  variant = 'default',
}: ExperienceBulletListProps) {
  if (!items?.length) return null

  const textClass =
    variant === 'achievement'
      ? 'block text-base font-semibold leading-relaxed text-ink'
      : 'block text-base font-medium leading-relaxed text-ink/85 sm:text-[1.05rem]'

  return (
    <ul className={`mt-5 list-none space-y-0 p-0 ${className}`} role="list">
      {items.map((item, index) => (
        <li
          key={item}
          className={`flex items-start gap-4 py-4 ${
            index < items.length - 1 ? 'border-b border-line/60' : ''
          }`}
        >
          <span
            aria-hidden="true"
            className="mt-[0.6rem] block h-2 w-2 shrink-0 rounded-full bg-accent"
          />
          {variant === 'achievement' ? (
            <span className={textClass}>
              <span className="text-accent">Achievement: </span>
              {item}
            </span>
          ) : (
            <span className={textClass}>{item}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
