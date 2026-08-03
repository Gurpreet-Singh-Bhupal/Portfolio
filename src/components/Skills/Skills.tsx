import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '../../data/resume'
import { Reveal } from '../Common'

const skillHoverClass =
  'rounded-md border border-line bg-canvas px-3.5 py-2 text-sm font-semibold text-ink shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:border-accent hover:shadow-[0_10px_22px_rgba(184,134,11,0.38)] focus-within:border-accent dark:hover:shadow-[0_10px_22px_rgba(212,160,23,0.35)]'

export function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-line bg-surface/60 py-14 sm:py-20"
    >
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-5">
        <h2 id="skills-heading" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Skills
        </h2>
        <p className="mt-2 max-w-2xl text-base font-medium text-ink/80 sm:text-lg">
          Grouped skills as tags — hover for a lifted gold accent.
        </p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-2">
          {skillGroups?.map((group, groupIndex) => (
            <motion.div
              key={group.name}
              className="rounded-xl border border-line bg-canvas/80 p-4 shadow-soft sm:p-5"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: Math.min(groupIndex * 0.06, 0.24) }}
            >
              <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-line pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent sm:text-base">
                  {group.name}
                </h3>
                <span className="text-xs font-semibold text-muted">
                  {group.skills?.length ?? 0} skills
                </span>
              </div>
              <ul className="flex flex-wrap gap-2.5" aria-label={`${group.name} skills`}>
                {group.skills?.map((skill) => (
                  <li key={skill}>
                    <span className={`inline-block ${skillHoverClass}`}>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
