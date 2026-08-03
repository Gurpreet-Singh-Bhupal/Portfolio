import { experience } from '../../data/resume'
import { Reveal } from '../Common'
import { ExperienceBulletList } from './ExperienceBulletList'

/**
 * Timeline rail: line stops with a gap before/after each dot (reference-style).
 * Dot top 0.75rem, size 0.875rem, 0.5rem gap on each side of dot.
 */
const TIMELINE_AXIS = 'left-[7px]'
const DOT_CLASS = `absolute ${TIMELINE_AXIS} top-3 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-canvas bg-accent shadow-[0_0_0_3px_rgba(184,134,11,0.25)]`
const LINE_ABOVE_CLASS = `absolute ${TIMELINE_AXIS} top-0 h-[calc(0.75rem-0.5rem)] w-0.5 -translate-x-1/2 bg-line`
const LINE_BELOW_CLASS = `absolute ${TIMELINE_AXIS} top-[calc(0.75rem+0.875rem+0.5rem)] w-0.5 -translate-x-1/2 bg-line`

export function Experience() {
  const lastIndex = (experience?.length ?? 0) - 1

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-line py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal>
          <h2
            id="experience-heading"
            className="font-display text-3xl font-semibold text-ink sm:text-4xl"
          >
            Experience
          </h2>
        </Reveal>
        <ol className="mt-8 sm:mt-10">
          {experience?.map((job, index) => (
            <li
              key={`${job.company}-${job.role}-${job.period}`}
              className={`relative pl-8 sm:pl-10 ${
                index < lastIndex ? 'pb-10 sm:pb-12' : ''
              }`}
            >
              {index > 0 ? <span aria-hidden="true" className={LINE_ABOVE_CLASS} /> : null}

              <span aria-hidden="true" className={DOT_CLASS} />

              <span
                aria-hidden="true"
                className={`${LINE_BELOW_CLASS} ${
                  index < lastIndex ? 'bottom-10 sm:bottom-12' : 'bottom-0'
                }`}
              />

              <Reveal delay={Math.min(index * 0.05, 0.2)}>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">{job.role}</h3>
                <p className="mt-1 text-base font-semibold text-ink/85 sm:text-lg">
                  {job.company}
                  {job.period ? ` · ${job.period}` : ''}
                </p>

                {job.projects?.length > 0 ? (
                  <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
                    {job.projects.map((project) => (
                      <article
                        key={`${job.company}-${project.name}`}
                        className="rounded-lg border border-line bg-surface/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_12px_28px_rgba(184,134,11,0.2)] sm:p-5"
                      >
                        <h4 className="text-lg font-bold text-ink sm:text-xl">{project.name}</h4>
                        {project.description ? (
                          <p className="mt-2 text-base font-medium leading-relaxed text-ink/85 sm:text-[1.05rem]">
                            {project.description}
                          </p>
                        ) : null}
                        {project.responsibilities?.length > 0 ? (
                          <ExperienceBulletList items={project.responsibilities} />
                        ) : null}
                        {project.technologies?.length > 0 ? (
                          <ul
                            className="mt-4 flex flex-wrap gap-2"
                            aria-label={`${project.name} technologies`}
                          >
                            {project.technologies.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-md bg-accent-soft px-3 py-1.5 text-sm font-semibold text-ink"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {project.achievements?.length > 0 ? (
                          <ExperienceBulletList items={project.achievements} variant="achievement" />
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
