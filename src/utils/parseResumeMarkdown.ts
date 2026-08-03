import type {
  EducationItem,
  ExperienceItem,
  ExperienceProject,
  ProjectItem,
  ResumeBasics,
  ResumeData,
  SkillGroup,
} from '../types/resume'

const DEFAULT_BASICS: ResumeBasics = {
  name: 'Your Name',
  title: 'Senior Frontend Developer',
  email: '',
  emails: [],
  phones: [],
  location: '',
  linkedin: '',
  github: '',
  yearsExperience: 0,
  pdfPath: '/resume.pdf',
  photoPath: '',
}

const SECTION_ALIASES: Record<string, string> = {
  summary: 'summary',
  about: 'about',
  interests: 'interests',
  skills: 'skills',
  'professional experience': 'experience',
  experience: 'experience',
  'portfolio projects': 'projects',
  projects: 'projects',
  education: 'education',
  'major achievements': 'achievements',
  achievements: 'achievements',
  certifications: 'certifications',
  languages: 'languages',
  contact: 'contact',
}

function stripQuotes(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

/** Normalize public asset paths (`/public/x` → `/x`). Empty stays empty for optional photo. */
function normalizePublicPath(path: string, fallback = ''): string {
  const trimmed = path.trim()
  if (!trimmed) return fallback
  if (trimmed.startsWith('/public/')) {
    return `/${trimmed.slice('/public/'.length)}`
  }
  if (trimmed.startsWith('public/')) {
    return `/${trimmed.slice('public/'.length)}`
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function parseEmails(raw: string): string[] {
  return raw
    .split(/[/|,]/)
    .map((part) => part.trim())
    .filter((part) => part.includes('@'))
}

/** Parse YAML-ish frontmatter, including simple list fields (phone: / - item). */
function parseFrontmatter(raw: string): { basics: ResumeBasics; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { basics: { ...DEFAULT_BASICS }, body: raw }
  }

  const [, front, body] = match
  const basics: ResumeBasics = {
    ...DEFAULT_BASICS,
    emails: [],
    phones: [],
  }

  const lines = front.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const line = lines[i] ?? ''
    const idx = line.indexOf(':')
    if (idx === -1) {
      i += 1
      continue
    }

    const key = line.slice(0, idx).trim()
    const inline = stripQuotes(line.slice(idx + 1))

    if (key === 'phone' || key === 'emails') {
      const list: string[] = []
      if (inline) {
        list.push(...(key === 'emails' ? parseEmails(inline) : [inline].filter(Boolean)))
      }
      i += 1
      while (i < lines.length) {
        const next = (lines[i] ?? '').trim()
        if (next.startsWith('- ')) {
          list.push(stripQuotes(next.slice(2)))
          i += 1
          continue
        }
        break
      }
      if (key === 'phone') basics.phones = list.filter(Boolean)
      else basics.emails = list.filter(Boolean)
      continue
    }

    switch (key) {
      case 'name':
      case 'title':
      case 'location':
      case 'linkedin':
      case 'github':
        basics[key] = inline
        break
      case 'email': {
        const emails = parseEmails(inline)
        basics.emails = emails.length > 0 ? emails : inline ? [inline] : []
        basics.email = basics.emails[0] ?? ''
        break
      }
      case 'pdfPath':
        basics.pdfPath = normalizePublicPath(inline, '/resume.pdf')
        break
      case 'photoPath':
        basics.photoPath = normalizePublicPath(inline, '')
        break
      case 'yearsExperience': {
        const num = Number.parseInt(inline.replace(/[^\d]/g, ''), 10)
        basics.yearsExperience = Number.isFinite(num) ? num : 0
        break
      }
      default:
        break
    }
    i += 1
  }

  if (!basics.email && basics.emails.length > 0) {
    basics.email = basics.emails[0] ?? ''
  }

  return { basics, body }
}

/** Top-level resume sections use `# Heading`. */
function splitH1Sections(body: string): Map<string, string> {
  const sections = new Map<string, string>()
  const parts = body.split(/^#\s+/m).filter(Boolean)

  for (const part of parts) {
    const newline = part.search(/\r?\n/)
    const rawTitle = (newline === -1 ? part : part.slice(0, newline)).trim().toLowerCase()
    const content = newline === -1 ? '' : part.slice(newline).trim()
    const key = SECTION_ALIASES[rawTitle] ?? rawTitle
    // Skip horizontal-rule-only leftovers
    if (!key || key === '---') continue
    sections.set(key, content.replace(/^---\s*/m, '').trim())
  }

  return sections
}

function parseBulletList(block: string): string[] {
  return block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
}

function splitH2Chunks(content: string): string[] {
  return content.split(/^##\s+/m).filter((chunk) => chunk.trim().length > 0)
}

function splitH3Chunks(content: string): string[] {
  return content.split(/^###\s+/m).filter((chunk) => chunk.trim().length > 0)
}

function parseLabeledBlocks(body: string): Record<string, string> {
  const labels = [
    'Description',
    'Responsibilities',
    'Technologies',
    'Achievements',
    'GitHub',
    'Live',
  ]
  const result: Record<string, string> = {}
  const pattern = new RegExp(`^(${labels.join('|')})\\s*$`, 'gim')
  const indices: { label: string; start: number; labelEnd: number }[] = []
  let match: RegExpExecArray | null

  while ((match = pattern.exec(body)) !== null) {
    indices.push({
      label: match[1].toLowerCase(),
      start: match.index,
      labelEnd: match.index + match[0].length,
    })
  }

  if (indices.length === 0) {
    result._raw = body.trim()
    return result
  }

  for (let i = 0; i < indices.length; i += 1) {
    const current = indices[i]
    const end = i + 1 < indices.length ? indices[i + 1].start : body.length
    result[current.label] = body.slice(current.labelEnd, end).trim()
  }

  return result
}

function parseTechList(block: string): string[] {
  const bullets = parseBulletList(block)
  if (bullets.length > 0) return bullets
  return block
    .split(/[,\n]/)
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseSkillGroups(content: string): SkillGroup[] {
  if (!content.trim()) return []

  const groups: SkillGroup[] = []
  for (const chunk of splitH2Chunks(content)) {
    const newline = chunk.search(/\r?\n/)
    const name = (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
    const body = newline === -1 ? '' : chunk.slice(newline).trim()
    groups.push({ name, skills: parseBulletList(body) })
  }

  return groups
}

function parseExperienceProject(chunk: string): ExperienceProject {
  const newline = chunk.search(/\r?\n/)
  const heading = (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
  const body = newline === -1 ? '' : chunk.slice(newline).trim()
  const name = heading.replace(/^project:\s*/i, '').trim() || heading
  const labeled = parseLabeledBlocks(body)

  return {
    name,
    description: labeled.description?.replace(/\n+/g, ' ').trim() ?? '',
    responsibilities: parseBulletList(labeled.responsibilities ?? ''),
    technologies: parseTechList(labeled.technologies ?? ''),
    achievements: parseBulletList(labeled.achievements ?? ''),
  }
}

function parseExperience(content: string): ExperienceItem[] {
  if (!content.trim()) return []

  const items: ExperienceItem[] = []

  for (const chunk of splitH2Chunks(content)) {
    const newline = chunk.search(/\r?\n/)
    const heading = (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
    const body = newline === -1 ? '' : chunk.slice(newline).trim()
    const [role = '', company = '', period = ''] = heading.split('|').map((p) => p.trim())

    const projectChunks = splitH3Chunks(body)
    const projects =
      projectChunks.length > 0
        ? projectChunks.map(parseExperienceProject)
        : []

    const responsibilities = projects.flatMap((p) => p.responsibilities)
    const technologies = [...new Set(projects.flatMap((p) => p.technologies))]
    const achievements = projects.flatMap((p) => p.achievements)

    items.push({
      role,
      company,
      period,
      projects,
      responsibilities,
      technologies,
      achievements,
    })
  }

  return items
}

function parseProjects(content: string): ProjectItem[] {
  if (!content.trim()) return []

  const items: ProjectItem[] = []

  for (const chunk of splitH2Chunks(content)) {
    const newline = chunk.search(/\r?\n/)
    const name = (newline === -1 ? chunk : chunk.slice(0, newline)).trim()
    const body = newline === -1 ? '' : chunk.slice(newline).trim()
    const labeled = parseLabeledBlocks(body)

    const githubLine = labeled.github?.split(/\r?\n/).map((l) => l.trim()).find(Boolean)
    const liveLine = labeled.live?.split(/\r?\n/).map((l) => l.trim()).find(Boolean)

    items.push({
      name,
      description: labeled.description?.replace(/\n+/g, ' ').trim() ?? '',
      technologies: parseTechList(labeled.technologies ?? ''),
      github: githubLine?.startsWith('http') ? githubLine : undefined,
      live: liveLine?.startsWith('http') ? liveLine : undefined,
    })
  }

  return items
}

function parseEducation(content: string): EducationItem[] {
  if (!content.trim()) return []

  const items: EducationItem[] = []

  for (const chunk of splitH2Chunks(content)) {
    const lines = chunk
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && l !== '---')

    const degree = lines[0] ?? ''
    const school = lines[1] ?? ''
    const period = lines[2] ?? ''
    const bulletDetails = parseBulletList(chunk)
    const extraLines = lines.slice(3).filter((l) => !l.startsWith('- '))

    items.push({
      degree,
      school,
      period,
      details: bulletDetails.length > 0 ? bulletDetails : extraLines,
    })
  }

  return items
}

function enrichBasicsFromContact(basics: ResumeBasics, contactSection: string): ResumeBasics {
  const next = { ...basics, emails: [...basics.emails], phones: [...basics.phones] }
  const emailMatch = contactSection.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
  if (emailMatch) {
    for (const email of emailMatch) {
      if (!next.emails.includes(email)) next.emails.push(email)
    }
    if (!next.email) next.email = emailMatch[0] ?? ''
  }

  const phoneBullets = parseBulletList(contactSection)
  for (const phone of phoneBullets) {
    if (/^\d[\d\s-]{6,}$/.test(phone) && !next.phones.includes(phone)) {
      next.phones.push(phone)
    }
  }

  return next
}

/** Parse structured `docs/Resume/Resume.md` into typed portfolio data. */
export function parseResumeMarkdown(raw: string): ResumeData {
  const { basics: rawBasics, body } = parseFrontmatter(raw)
  const sections = splitH1Sections(body)
  const basics = enrichBasicsFromContact(rawBasics, sections.get('contact') ?? '')

  return {
    basics,
    summary: sections.get('summary')?.replace(/^---\s*/m, '').trim() ?? '',
    about: sections.get('about')?.replace(/^---\s*/m, '').trim() ?? '',
    interests: parseBulletList(sections.get('interests') ?? ''),
    skillGroups: parseSkillGroups(sections.get('skills') ?? ''),
    experience: parseExperience(sections.get('experience') ?? ''),
    projects: parseProjects(sections.get('projects') ?? ''),
    education: parseEducation(sections.get('education') ?? ''),
    majorAchievements: parseBulletList(sections.get('achievements') ?? ''),
    certifications: parseBulletList(sections.get('certifications') ?? ''),
    languages: parseBulletList(sections.get('languages') ?? ''),
  }
}
