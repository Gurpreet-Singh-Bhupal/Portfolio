export type ResumeBasics = {
  name: string
  title: string
  /** Primary email (mailto + Contact fallback). */
  email: string
  emails: string[]
  phones: string[]
  location: string
  linkedin: string
  github: string
  yearsExperience: number
  pdfPath: string
  /** Public URL for profile photo, e.g. `/profile.jpg`. Empty = show placeholder. */
  photoPath: string
}

export type SkillGroup = {
  name: string
  skills: string[]
}

/** A project delivered under a job (e.g. Three UK, Vodafone Romania). */
export type ExperienceProject = {
  name: string
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  projects: ExperienceProject[]
  /** Flattened helpers for simple UIs */
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
}

export type ProjectItem = {
  name: string
  description: string
  technologies: string[]
  github?: string
  live?: string
}

export type EducationItem = {
  degree: string
  school: string
  period: string
  details: string[]
}

export type ResumeData = {
  basics: ResumeBasics
  summary: string
  about: string
  interests: string[]
  skillGroups: SkillGroup[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  majorAchievements: string[]
  certifications: string[]
  languages: string[]
}
