// =============================================================================
// data/portfolio.ts — Single source of truth for all personal content.
// Edit ONLY this file to replace placeholders with your real information.
// =============================================================================

export interface Project {
  id: string
  name: string
  category: string
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
    // ── Spring Boot ──
    {
      id: 'collabcode',
      name: 'CollabCode',
      category: 'Spring Boot',
      description: 'A real time collaborative code editor with a built in AI debugging agent. The agent uses Google Gemini and verifies its fixes by actually running the code.',
      longDescription: 'Engineered a full-stack real-time collaborative code editor using Yjs CRDT over raw binary WebSockets, enabling conflict-free concurrent document synchronization. Integrates an autonomous AI debugging agent powered by Google Gemini that verifies fixes by executing code.',
      tech: ['Spring Boot', 'React', 'Google Gemini'],
      url: 'https://collab-code-application.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/CollabCode',
      featured: true,
    },
    {
      id: 'applyrec',
      name: 'ApplyRec',
      category: 'Spring Boot',
      description: 'A full stack job application tracker to log, filter and manage every application in one place.',
      longDescription: 'A full stack job application tracker to log, filter, and manage every stage of your job hunt in one place with status updates and organized interview records.',
      tech: ['Spring Boot', 'React'],
      url: 'https://applyrec-frontend.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/ApplyRec',
      featured: false,
    },

    // ── Machine Learning ──
    {
      id: 'pulmoscan-ai',
      name: 'PulmoScan AI',
      category: 'Machine Learning',
      description: 'A deep learning pneumonia screening tool built to minimize false negatives. Benchmarks ResNet50 (baseline) against DenseNet121 (champion) on chest X rays.',
      longDescription: 'A deep learning pneumonia screening tool built to minimize false negatives. Benchmarks ResNet50 (baseline) against DenseNet121 (champion) on chest X rays with diagnostic sensitivity.',
      tech: ['PyTorch', 'Torchvision', 'OpenCV'],
      url: 'https://pulmoscan-ai-ayushpremrocks.streamlit.app/',
      repo: 'https://github.com/Ayushpremrocks/PulmoScan-AI',
      featured: true,
    },
    {
      id: 'evolution-simulation',
      name: 'Evolution Simulation',
      category: 'Machine Learning',
      description: 'A Unity simulator where simple organisms evolve complex survival behaviors using evolutionary algorithms and neural networks, with zero hand coded behavior.',
      longDescription: 'A Unity simulator where simple organisms evolve complex survival behaviors using evolutionary algorithms and neural networks, with zero hand coded behavior.',
      tech: ['C#', 'Unity'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Evolution-Simulation',
      featured: false,
    },
    {
      id: 'automated-bill-extraction-system',
      name: 'Automated Bill Extraction System',
      category: 'Machine Learning',
      description: 'Extracts structured data from messy real world medical bills where traditional OCR fails, such as complex layouts and rotated text. Combines visual understanding with textual precision.',
      longDescription: 'Extracts structured data from messy real world medical bills where traditional OCR fails, such as complex layouts and rotated text. Combines visual understanding with textual precision.',
      tech: ['FastAPI', 'Google Gemini'],
      url: 'https://automated-bill-extraction-system.onrender.com/',
      repo: 'https://github.com/Ayushpremrocks/Automated-Bill-Extraction-System',
      featured: true,
    },

    // ── Chatbots ──
    {
      id: 'anushka',
      name: 'Anushka',
      category: 'Chatbots',
      description: 'A scalable, stateful, multi modal AI agent inside WhatsApp. It has a dynamic personality engine, long term memory, and real time image processing and generation.',
      longDescription: 'A scalable, stateful, multi modal AI agent inside WhatsApp. It has a dynamic personality engine, long term memory, and real time image processing and generation.',
      tech: ['Node.js', 'Google Gemini', 'Groq'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Anushka-wsp-ai',
      featured: true,
    },
    {
      id: 'kgbot',
      name: 'KGBot',
      category: 'Chatbots',
      description: 'A Telegram bot for group management, user moderation and AI conversations powered by the Gemini API.',
      longDescription: 'A Telegram bot for group management, user moderation and AI conversations powered by the Gemini API.',
      tech: ['Python', 'python telegram bot', 'Google Gemini'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/KGBot',
      featured: false,
    },

    // ── Hardware ──
    {
      id: 'ignite-fence',
      name: 'Ignite.fence',
      category: 'Hardware',
      description: 'IoT smart electric fencing and perimeter security monitoring system with real-time mobile alerts and telemetry.',
      longDescription: 'IoT smart electric fencing and perimeter security monitoring system with real-time mobile alerts and telemetry.',
      tech: ['Arduino', 'ESP', 'Dart', 'PHP'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Ignite.fence',
      featured: false,
    },

    // ── Java ──
    {
      id: 'certificate-generator',
      name: 'Certificate Generator',
      category: 'Java',
      description: 'A digital certificate generation system with QR code integration for authenticity verification.',
      longDescription: 'A digital certificate generation system with QR code integration for authenticity verification.',
      tech: ['Java', 'Servlets', 'JSP', 'XML'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Certificate-Generator',
      featured: false,
    },
    {
      id: 'library-management-system',
      name: 'Library Management System',
      category: 'Java',
      description: 'A Java based system to manage library books and records.',
      longDescription: 'A Java based system to manage library books and records.',
      tech: ['Java'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Library-management-system',
      featured: false,
    },

    // ── Next.js and React ──
    {
      id: 'hire-orbit',
      name: 'HireOrbit',
      category: 'Next.js and React',
      description: 'A full stack recruitment portal with separate flows for recruiters and candidates, job management, subscriptions and professional networking.',
      longDescription: 'A full stack recruitment portal with separate flows for recruiters and candidates, job management, subscriptions and professional networking.',
      tech: ['Next.js', 'React'],
      url: 'https://hire-orbit.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/Hire-Orbit',
      featured: true,
    },
    {
      id: 'organic-connect',
      name: 'OrganicConnect',
      category: 'Next.js and React',
      description: 'An e-commerce platform for organic products with a shopping cart, order tracking, farmer dashboards and reviews.',
      longDescription: 'An e-commerce platform for organic products with a shopping cart, order tracking, farmer dashboards and reviews.',
      tech: ['React'],
      url: 'https://organicconnect.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/Organic-Connect',
      featured: false,
    },

    // ── Data Analytics ──
    {
      id: 'global-universities-success-analysis',
      name: 'Global Universities Success Analysis',
      category: 'Data Analytics',
      description: 'Explores university performance through interactive visualizations and statistical analysis.',
      longDescription: 'Explores university performance through interactive visualizations and statistical analysis.',
      tech: ['Power BI'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Global-Universities-Success-Analysis',
      featured: false,
    },
    {
      id: 'restaurant-ratings-analysis',
      name: 'Restaurant Ratings Analysis',
      category: 'Data Analytics',
      description: 'Analyzes real consumer restaurant ratings in Mexico (2012) to uncover dining preferences and consumer behavior through interactive dashboards.',
      longDescription: 'Analyzes real consumer restaurant ratings in Mexico (2012) to uncover dining preferences and consumer behavior through interactive dashboards.',
      tech: ['Power BI'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Restaurant-Ratings-Analysis',
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
