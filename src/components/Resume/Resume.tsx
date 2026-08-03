import { basics, education, summary } from '../../data/resume'
import { BTN_PRIMARY_CLASS, getResumePdfHref } from '../../constants'
import { Reveal } from '../Common'

export function Resume() {
  const pdfHref = getResumePdfHref(basics?.pdfPath)

  return (
    <section id="resume" aria-labelledby="resume-heading" className="border-b border-line py-12 sm:py-16">
      <Reveal className="mx-auto max-w-5xl px-4 sm:px-5">
        <h2 id="resume-heading" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Resume
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
          Download or open the PDF. Site content stays in sync with `docs/Resume/Resume.md`.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">{summary}</p>
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <a href={pdfHref} download className={BTN_PRIMARY_CLASS}>
            Download Resume (PDF)
          </a>
          <a
            href={pdfHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open Resume
          </a>
        </div>
        {education?.length > 0 ? (
          <div className="mt-8 sm:mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={`${item.degree}-${item.school}-${item.period}`}>
                  <p className="font-semibold text-ink">{item.degree}</p>
                  <p className="text-sm text-muted">
                    {item.school}
                    {item.period ? ` · ${item.period}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Reveal>
    </section>
  )
}
