type ExperienceBulletListProps = {
  items: string[]
  className?: string
}

/** Bullet rows with spacing + divider lines. */
export function ExperienceBulletList({ items, className = '' }: ExperienceBulletListProps) {
  if (!items?.length) return null

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
          <span className="block text-base font-medium leading-relaxed text-ink/85 sm:text-[1.05rem]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
