import { useEffect, useId, useState } from 'react'
import { NAV_ITEMS } from '../../constants/nav'
import { basics } from '../../data/resume'
import { useFont } from '../../hooks/useFont'
import { FontToggle, ThemeToggle } from '../Common'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const { fontId } = useFont()
  const isLucida = fontId === 'lucida'

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
        <a
          href="#home"
          title={basics?.name}
          className={`shrink font-display font-semibold leading-snug tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isLucida ? 'text-xs sm:text-sm lg:text-base' : 'text-sm sm:text-base lg:text-lg'
          }`}
        >
          <span className="block max-w-[10rem] whitespace-normal break-words sm:max-w-[14rem] lg:max-w-[18rem] xl:max-w-none">
            {basics?.name}
          </span>
        </a>

        <nav
          aria-label="Primary"
          className={`mx-auto hidden min-w-0 flex-1 items-center justify-center lg:flex ${
            isLucida ? 'gap-2 xl:gap-3' : 'gap-3 xl:gap-5'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`whitespace-nowrap font-semibold text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isLucida ? 'text-xs' : 'text-sm'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 flex-nowrap items-center gap-2">
          <FontToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-md bg-accent px-3 text-sm font-semibold text-on-accent transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-line bg-canvas px-4 py-3 lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-base font-semibold text-ink hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
