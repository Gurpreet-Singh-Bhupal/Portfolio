import { basics, summary } from '../../data/resume'
import { BTN_PRIMARY_CLASS, getResumePdfHref } from '../../constants'
import { isUsableSocialUrl } from '../../utils/socialLinks'
import { ProfilePhoto, ImmediateJoinerBadge, Reveal } from '../Common'

export function Hero() {
  const pdfHref = getResumePdfHref(basics?.pdfPath)

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-line bg-atmosphere"
    >
      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-10 px-4 py-14 sm:px-5 sm:py-20 md:min-h-[72vh] md:flex-row md:items-center md:gap-12 lg:gap-16">
        <Reveal delay={0.04} className="order-1 mx-auto flex shrink-0 flex-col items-center gap-3 md:order-2 md:mx-0">
          <ProfilePhoto size="hero" />
          <ImmediateJoinerBadge />
        </Reveal>
        <Reveal className="order-2 flex max-w-2xl flex-col gap-6 sm:gap-8 md:order-1">
          <p className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            {basics?.name}
          </p>
          <div className="space-y-3 sm:space-y-4">
            <h1
              id="hero-heading"
              className="font-sans text-xl font-semibold text-accent sm:text-2xl md:text-3xl"
            >
              {basics?.title}
            </h1>
            <p className="text-base font-medium leading-relaxed text-ink/85 sm:text-lg md:text-xl">
              {summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a href={pdfHref} download className={BTN_PRIMARY_CLASS}>
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Contact Me
            </a>
            {isUsableSocialUrl(basics?.github) ? (
              <a
                href={basics.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4"
              >
                GitHub
              </a>
            ) : null}
            {isUsableSocialUrl(basics?.linkedin) ? (
              <a
                href={basics.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4"
              >
                LinkedIn
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
