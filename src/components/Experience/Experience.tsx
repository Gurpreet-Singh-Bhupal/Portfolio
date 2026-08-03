import { experience } from '../../data/resume'
import { Reveal } from '../Common'

export function Experience() {
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
        <ol className="mt-8 space-y-10 border-l-2 border-line pl-5 sm:mt-10 sm:space-y-12 sm:pl-7">
          {experience?.map((job, index) => (
            <li key={`${job.company}-${job.role}-${job.period}`} className="relative">
              <Reveal delay={Math.min(index * 0.05, 0.2)}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.45rem] top-2 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(184,134,11,0.2)] sm:-left-[1.95rem]"
                />
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
                          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base font-medium leading-relaxed text-ink/80">
                            {project.responsibilities.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
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
                          <ul className="mt-3 space-y-1 text-base font-semibold text-ink">
                            {project.achievements.map((item) => (
                              <li key={item}>
                                <span className="text-accent">Achievement: </span>
                                {item}
                              </li>
                            ))}
                          </ul>
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
