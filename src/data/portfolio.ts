// =============================================================================
// data/portfolio.ts — Single source of truth for all personal content.
// Edit ONLY this file to replace placeholders with your real information.
// =============================================================================

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tech: string[]
  url: string
  repo: string
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  period: string
  gpa?: string
  details: string[]
}

export interface Skill {
  name: string
  level: number // 1-5
}

export const portfolio = {
  // ── Personal ─────────────────────────────────────────────────────────────────
  name: '[Your Name]',
  title: '[Your Title]',
  subtitle: '[Your Subtitle — e.g. Full-Stack Developer]',
  location: '[Your Location]',
  email: '[Email]',
  phone: '[Phone Number]',
  bio: [
    "[Your Name] is a passionate [Your Title] with [X] years of experience",
    "building scalable web applications and thoughtful user experiences.",
    "",
    "Specializing in [Your Stack], I love crafting clean, performant code",
    "and turning complex problems into elegant solutions.",
    "",
    "When I'm not coding, you'll find me [Your Hobbies].",
  ],

  // ── Social Links ──────────────────────────────────────────────────────────────
  social: {
    github: '[GitHub URL]',
    linkedin: '[LinkedIn URL]',
    twitter: '[Twitter URL]',
    website: '[Website URL]',
  },

  // ── Skills ───────────────────────────────────────────────────────────────────
  skills: {
    languages: [
      { name: '[Language 1]', level: 5 },
      { name: '[Language 2]', level: 4 },
      { name: '[Language 3]', level: 4 },
      { name: '[Language 4]', level: 3 },
    ] as Skill[],
    frameworks: [
      { name: '[Framework 1]', level: 5 },
      { name: '[Framework 2]', level: 4 },
      { name: '[Framework 3]', level: 4 },
      { name: '[Framework 4]', level: 3 },
    ] as Skill[],
    tools: [
      { name: '[Tool 1]', level: 5 },
      { name: '[Tool 2]', level: 4 },
      { name: '[Tool 3]', level: 4 },
      { name: '[Tool 4]', level: 3 },
    ] as Skill[],
    databases: [
      { name: '[Database 1]', level: 4 },
      { name: '[Database 2]', level: 3 },
    ] as Skill[],
  },

  // ── Projects ──────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'project-1',
      name: '[Project Name 1]',
      description: '[Short one-line description of Project 1]',
      longDescription: '[Longer description explaining what Project 1 does, the problem it solves, and your role in building it.]',
      tech: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
      url: '[Live URL]',
      repo: '[GitHub Repo URL]',
      featured: true,
    },
    {
      id: 'project-2',
      name: '[Project Name 2]',
      description: '[Short one-line description of Project 2]',
      longDescription: '[Longer description explaining what Project 2 does, the problem it solves, and your role in building it.]',
      tech: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
      url: '[Live URL]',
      repo: '[GitHub Repo URL]',
      featured: true,
    },
    {
      id: 'project-3',
      name: '[Project Name 3]',
      description: '[Short one-line description of Project 3]',
      longDescription: '[Longer description explaining what Project 3 does, the problem it solves, and your role in building it.]',
      tech: ['[Tech 1]', '[Tech 2]'],
      url: '[Live URL]',
      repo: '[GitHub Repo URL]',
      featured: false,
    },
    {
      id: 'project-4',
      name: '[Project Name 4]',
      description: '[Short one-line description of Project 4]',
      longDescription: '[Longer description explaining what Project 4 does.]',
      tech: ['[Tech 1]', '[Tech 2]'],
      url: '[Live URL]',
      repo: '[GitHub Repo URL]',
      featured: false,
    },
  ] as Project[],

  // ── Experience ────────────────────────────────────────────────────────────────
  experience: [
    {
      id: 'exp-1',
      company: '[Company Name 1]',
      role: '[Job Title]',
      period: '[Start Date] — Present',
      location: '[City, Country / Remote]',
      bullets: [
        '[Key accomplishment or responsibility #1]',
        '[Key accomplishment or responsibility #2]',
        '[Key accomplishment or responsibility #3]',
        '[Key accomplishment or responsibility #4]',
      ],
    },
    {
      id: 'exp-2',
      company: '[Company Name 2]',
      role: '[Job Title]',
      period: '[Start Date] — [End Date]',
      location: '[City, Country / Remote]',
      bullets: [
        '[Key accomplishment or responsibility #1]',
        '[Key accomplishment or responsibility #2]',
        '[Key accomplishment or responsibility #3]',
      ],
    },
    {
      id: 'exp-3',
      company: '[Company Name 3]',
      role: '[Job Title / Internship]',
      period: '[Start Date] — [End Date]',
      location: '[City, Country / Remote]',
      bullets: [
        '[Key accomplishment or responsibility #1]',
        '[Key accomplishment or responsibility #2]',
      ],
    },
  ] as Experience[],

  // ── Education ─────────────────────────────────────────────────────────────────
  education: [
    {
      id: 'edu-1',
      school: '[University / College Name]',
      degree: '[Degree Type — e.g. Bachelor of Science]',
      field: '[Field of Study]',
      period: '[Year] — [Year]',
      gpa: '[GPA / Grade]',
      details: [
        '[Relevant coursework, thesis, or notable achievement #1]',
        '[Relevant coursework, thesis, or notable achievement #2]',
        '[Clubs, societies, or extracurricular activities]',
      ],
    },
    {
      id: 'edu-2',
      school: '[High School / Secondary School Name]',
      degree: '[Diploma / A-Levels / etc.]',
      field: '[Major subjects]',
      period: '[Year] — [Year]',
      details: [
        '[Notable achievement or activity]',
      ],
    },
  ] as Education[],

  // ── Resume ───────────────────────────────────────────────────────────────────
  resumeUrl: '[Resume PDF URL]',
}
