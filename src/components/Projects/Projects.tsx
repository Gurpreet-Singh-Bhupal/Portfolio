import { projects } from '../../data/resume'
import { isUsableSocialUrl } from '../../utils/socialLinks'
import { Reveal } from '../Common'

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-line bg-surface/60 py-14 sm:py-20"
    >
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-5">
        <h2 id="projects-heading" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Projects
        </h2>
        <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-2">
          {projects?.map((project) => (
            <article
              key={project.name}
              className="rounded-lg border border-line bg-canvas/70 p-4 pt-5 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_28px_rgba(184,134,11,0.22)] sm:p-5"
            >
              <h3 className="text-xl font-bold text-ink sm:text-2xl">{project.name}</h3>
              <p className="mt-2 text-base font-medium leading-relaxed text-ink/85">
                {project.description}
              </p>
              {project.technologies?.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3">
                {isUsableSocialUrl(project.github) ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    GitHub
                  </a>
                ) : null}
                {isUsableSocialUrl(project.live) ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
