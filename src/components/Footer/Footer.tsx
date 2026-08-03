import { basics } from '../../data/resume'
import { getPreferredContactEmail } from '../../services/email'
import { isUsableSocialUrl } from '../../utils/socialLinks'

export function Footer() {
  const year = new Date().getFullYear()
  const email = getPreferredContactEmail()

  return (
    <footer className="bg-canvas py-8 sm:py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-muted">
          © {year} {basics?.name}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {isUsableSocialUrl(basics?.github) ? (
            <a
              href={basics.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              GitHub
            </a>
          ) : null}
          {isUsableSocialUrl(basics?.linkedin) ? (
            <a
              href={basics.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              LinkedIn
            </a>
          ) : null}
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Email
            </a>
          ) : null}
          <a
            href="#home"
            className="font-medium text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
