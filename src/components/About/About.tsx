import {
  about,
  basics,
  certifications,
  interests,
  languages,
  majorAchievements,
} from '../../data/resume'
import { Reveal } from '../Common'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-line py-14 sm:py-20">
      <Reveal className="mx-auto max-w-6xl space-y-6 px-4 sm:space-y-8 sm:px-5">
        <div>
          <h2 id="about-heading" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            About
          </h2>
          {(basics?.yearsExperience ?? 0) > 0 ? (
            <p className="mt-3 text-base font-semibold text-accent">
              {basics.yearsExperience}+ years experience
            </p>
          ) : null}
          {basics?.location ? (
            <p className="mt-1 text-base font-medium text-ink/80">{basics.location}</p>
          ) : null}
          {languages?.length > 0 ? (
            <p className="mt-4 text-base font-medium text-ink/80">
              <span className="font-semibold text-ink">Languages: </span>
              {languages.join(', ')}
            </p>
          ) : null}
        </div>
        <div className="space-y-6">
          <p className="text-base font-medium leading-relaxed text-ink/85 sm:text-lg">{about}</p>
          {interests?.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Interests">
              {interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-accent-soft px-3 py-1 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {majorAchievements?.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                Highlights
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {majorAchievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {certifications?.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                Certifications
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
