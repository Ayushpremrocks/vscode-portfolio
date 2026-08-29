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
  name: 'Ayush Prem',
  title: 'Software Developer',
  subtitle: 'Software Developer, Problem Solver, Machine Learning Enthusiast',
  location: 'Chandigarh, IND',
  email: 'ayushpremrocks@gmail.com',
  phone: '[Phone Number]',
  bio: [
    "Ayush is a final-year Computer Science student and aspiring Software",
    "Development Engineer, building full-stack applications with React and",
    "Spring Boot.",
    "",
    "He also works with Python and FastAPI for ML-driven projects, and AWS",
    "for deployment and infrastructure — with C++ as his go-to for",
    "competitive programming and problem-solving.",
    "",
    "When he's not coding, you'll find him playing guitar.",
  ],

  // ── Social Links ──────────────────────────────────────────────────────────────
  social: {
    github: 'https://github.com/Ayushpremrocks',
    linkedin: 'https://www.linkedin.com/in/ayushpremrocks/',
    twitter: 'https://x.com/ayushpremrocks',
    website: 'https://www.ayushprem.rocks',
  },

  // ── Skills ───────────────────────────────────────────────────────────────────
  skills: {
    languages: [
      { name: 'C++', level: 5 },
      { name: 'Python', level: 4 },
      { name: 'Java', level: 4 },
      { name: 'JavaScript', level: 3 },
    ] as Skill[],
    frameworks: [
      { name: 'SpringBoot', level: 4 },
      { name: 'React.js', level: 3 },
      { name: 'Node.js', level: 4 },
      { name: 'FastAPI', level: 3 },
    ] as Skill[],
    tools: [
      { name: 'Git/Github', level: 5 },
      { name: 'Amazon Web Services', level: 4 },
      { name: 'Postman', level: 4 },
      { name: 'VS Code', level: 3 },
    ] as Skill[],
    databases: [
      { name: 'MySQL', level: 4 },
      { name: 'MongoDB', level: 3 },
    ] as Skill[],
  },

  // ── Projects ──────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'project-1',
      name: 'CollabCode',
      description: 'Real-Time Collaborative Code Editor',
      longDescription: [
        'Engineered a full-stack real-time collaborative code editor using Yjs CRDT over raw binary WebSockets, enabling conflict-free concurrent document synchronization across multiple users with guaranteed convergence.',
        'Implemented a dual WebSocket architecture — a raw binary channel for high-frequency Yjs CRDT updates and a STOMP pub/sub channel for live presence, chat, and host-controlled room state with instant broadcast.',
        'Migrated authentication from custom JWT to Clerk (OAuth 2.0), integrating JWKS-based token validation in Spring Security with auto-provisioned users and real-time profile sync across presence and chat.',
        'Integrated the Wandbox API for keyless multi-language code execution with live stdout/stderr feedback; deployed backend via Docker on Render with Neon PostgreSQL, frontend on Vercel.',
      ],
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
      company: 'Infosys SpringBoard',
      role: 'Intern',
      period: 'Nov 2025 — Jan 2026',
      location: 'Remote',
      bullets: [
        'Built responsive, modular frontend interfaces for Civix, a civic engagement platform, using React.js as part of an 8-member development team.',
        'Implemented geographic location filters and asynchronous community polls, enabling real-time citizen participation across the platform.',
        'Developed data dashboards to visualize community engagement metrics, translating raw civic data into actionable insights for users.',
        'Contributed to 4 milestones delivered across 8 weeks by following Agile/Scrum sprint cycles, including sprint planning, standups, and retrospectives.',
      ],
    },
    // {
    //   id: 'exp-2',
    //   company: '[Company Name 2]',
    //   role: '[Job Title]',
    //   period: '[Start Date] — [End Date]',
    //   location: '[City, Country / Remote]',
    //   bullets: [
    //     '[Key accomplishment or responsibility #1]',
    //     '[Key accomplishment or responsibility #2]',
    //     '[Key accomplishment or responsibility #3]',
    //   ],
    // },
    // {
    //   id: 'exp-3',
    //   company: '[Company Name 3]',
    //   role: '[Job Title / Internship]',
    //   period: '[Start Date] — [End Date]',
    //   location: '[City, Country / Remote]',
    //   bullets: [
    //     '[Key accomplishment or responsibility #1]',
    //     '[Key accomplishment or responsibility #2]',
    //   ],
    // },
  ] as Experience[],

  // ── Education ─────────────────────────────────────────────────────────────────
  education: [
    {
      id: 'edu-1',
      school: 'Chandigarh University',
      degree: 'Bachelor of Engineering',
      field: 'Computer Science and Engineering',
      period: '2023 — Present',
      //gpa: '7.87',
      details: [
        'Winner: Tekathon 4.0 (Internal Round for Smart India Hackathon), Chandigarh University',
        '2nd Position: Code Quest 2.0, Chandigarh University',
        'Ranked 6th in college in the ICPC (International Collegiate Programming Contest) preliminary round',
        'Relevant Coursework: Data Structures & Algorithms, Object Oriented Programming, Operating Systems, Computer Networks, Database Management Systems, System Design, Software Engineering',
      ],
    },
    {
      id: 'edu-2',
      school: 'Kendriya Vidyalaya',
      degree: 'Matriculation',
      //field: '[Major subjects]',
      period: '2019 — 2020',
      details: [
        'Spent 9 years studying in various Kendriya Vidyalayas throughout the country.',
      ],
    },
    {
      id: 'edu-3',
      school: 'Resonance Eduventures Limited',
      degree: 'JEE (Mains and Advanced)',
      field: 'Physics, Chemistry and Mathematics',
      period: '2020 — 2022',
      details: [
        'Pursued coaching in Physics, Chemistry, and Mathematics for JEE Mains and Advanced for 2 years',
      ],
    },
    {
      id: 'edu-4',
      school: 'Dr. Ulhas Patil English medium school',
      degree: 'Intermediate',
      field: 'Science (Mathematics)',
      period: '2020 — 2022',
      details: [
        'Completed Intermediate education with a focus on Physics, Chemistry, and Mathematics.',
      ],
    }
  ] as Education[],

  // ── Resume ───────────────────────────────────────────────────────────────────
  resumeUrl: '[Resume PDF URL]',
}
