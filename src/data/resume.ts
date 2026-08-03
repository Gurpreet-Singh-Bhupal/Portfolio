import resumeMarkdown from '../../docs/Resume/Resume.md?raw'
import { parseResumeMarkdown } from '../utils/parseResumeMarkdown'
import type { ResumeData } from '../types/resume'

/** Typed resume data parsed from `docs/Resume/Resume.md` (edit that file, not components). */
export const resume: ResumeData = parseResumeMarkdown(resumeMarkdown)

export const {
  basics,
  summary,
  about,
  interests,
  skillGroups,
  experience,
  projects,
  education,
  majorAchievements,
  certifications,
  languages,
} = resume
