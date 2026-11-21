// =============================================================================
// data/portfolio.ts — Single source of truth for all personal content.
// Hobby content lives in data/hobbies.ts; social URLs in config/socialLinks.ts.
// =============================================================================
import { SOCIAL_LINKS } from '../config/socialLinks'

export interface Project {
  id: string
  name: string
  category: string
  description: string
  tech: string[]
  url: string   // live demo ('' if none)
  repo: string  // source code ('' if none)
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
  field?: string
  period: string
  gpa?: string
  details: string[]
}

export interface Skill {
  name: string
  docsUrl: string
}

export interface SkillCategory {
  label: string
  color: string // accent used for the category heading / hover state
  skills: Skill[]
}

export interface Achievement {
  result: string      // e.g. "Winner", "2nd Position"
  event: string
  note?: string       // extra context shown under the event
  organizer: string
  place?: 1 | 2 | 3   // podium finish → medal icon
}

export interface Portfolio {
  name: string
  title: string
  subtitle: string
  location: string
  email: string
  availability: string
  focus: string[]
  bio: string[]
  social: {
    github: string
    linkedin: string
    twitter: string
    leetcode: string
    codeforces: string
    website: string
  }
  skills: SkillCategory[]
  achievements: Achievement[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  /**
   * Path or URL of your resume PDF. Put the file in /public (e.g. public/resume.pdf)
   * and set this to '/resume.pdf'. Leave '' to hide the download buttons.
   */
  resumeUrl: string
}

export const portfolio: Portfolio = {
  // ── Personal ─────────────────────────────────────────────────────────────────
  name: 'Ayush Prem',
  title: 'Software Engineer',
  subtitle: 'B.E. Computer Science · Chandigarh University · Final year',
  location: 'Chandigarh, IND',
  email: 'ayushpremrocks@gmail.com',
  availability: 'Open to SDE roles',
  focus: ['Full-stack', 'AI / ML', 'Web3', 'Competitive Programming'],
  // One entry per paragraph (the About page and the `about` terminal command both use this)
  bio: [
    "I'm a final-year Computer Science student at Chandigarh University and an aspiring Software Development Engineer. I like building complete products — from a real-time collaborative code editor with an AI debugging agent, to a GPU marketplace for AI agents on Hedera that I built at ETHGlobal Mumbai 2026.",
    "Most of my full-stack work is in React and Spring Boot. For AI and ML projects I use Python, PyTorch and FastAPI — a pneumonia-screening model, a medical-bill extraction pipeline, a WhatsApp AI agent — and I deploy on AWS and Vercel.",
    "Competitive programming keeps my fundamentals sharp: I'm a Knight on LeetCode, a Pupil on Codeforces and 3★ on CodeChef, with 1,200+ problems solved, mostly in C++. I've also won Tekathon 4.0, the Smart India Hackathon internal round at my university.",
    "Away from the keyboard you'll find me playing guitar, on a cricket or football field, or deep into an anime.",
  ],

  // ── Hackathons & contests ─────────────────────────────────────────────────────
  // Shown on the Achievements, About and Resume pages.
  achievements: [
    {
      result: 'Winner',
      event: 'Tekathon 4.0',
      note: 'Internal round for Smart India Hackathon',
      organizer: 'Chandigarh University',
      place: 1,
    },
    {
      result: '2nd Position',
      event: 'AlgoHour 4.0',
      organizer: 'Amity University',
      place: 2,
    },
    {
      result: '2nd Position',
      event: 'Code Quest 2.0',
      organizer: 'Chandigarh University',
      place: 2,
    },
    {
      result: '6th in College',
      event: 'ICPC Preliminary Round',
      note: 'International Collegiate Programming Contest',
      organizer: 'Chandigarh University',
    },
    {
      result: 'Hackathon Build',
      event: 'ETHGlobal Mumbai 2026',
      note: 'Built dani.ai, a GPU marketplace for AI agents on Hedera',
      organizer: 'ETHGlobal',
    },
  ],

  // ── Social Links ──────────────────────────────────────────────────────────────
  social: {
    github: SOCIAL_LINKS.GITHUB,
    linkedin: SOCIAL_LINKS.LINKEDIN,
    twitter: SOCIAL_LINKS.TWITTER,
    leetcode: SOCIAL_LINKS.LEETCODE,
    codeforces: SOCIAL_LINKS.CODEFORCES,
    website: 'https://www.ayushprem.rocks',
  },

  // ── Skills ───────────────────────────────────────────────────────────────────
  // Used by the Skills panel, Resume panel and the `skills` terminal command.
  // Icons are looked up by name in SkillsPanel.tsx (SKILL_ICONS).
  skills: [
    {
      label: 'Programming Languages',
      color: '#569cd6',
      skills: [
        { name: 'C', docsUrl: 'https://en.cppreference.com/w/c' },
        { name: 'C++', docsUrl: 'https://en.cppreference.com/w/cpp' },
        { name: 'Java', docsUrl: 'https://docs.oracle.com/en/java/' },
        { name: 'JavaScript', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'TypeScript', docsUrl: 'https://www.typescriptlang.org/docs/' },
        { name: 'Python', docsUrl: 'https://docs.python.org/3/' },
        { name: 'SQL', docsUrl: 'https://www.w3schools.com/sql/' },
        { name: 'HTML', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'CSS', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      ],
    },
    {
      label: 'Web',
      color: '#4ec9b0',
      skills: [
        { name: 'React.js', docsUrl: 'https://react.dev' },
        { name: 'Spring Boot', docsUrl: 'https://spring.io/projects/spring-boot' },
        { name: 'Tailwind CSS', docsUrl: 'https://tailwindcss.com/docs' },
        { name: 'Node.js', docsUrl: 'https://nodejs.org/en/docs' },
        { name: 'FastAPI', docsUrl: 'https://fastapi.tiangolo.com/' },
      ],
    },
    {
      label: 'ML',
      color: '#c586c0',
      skills: [
        { name: 'PyTorch', docsUrl: 'https://pytorch.org/docs/stable/index.html' },
        { name: 'TensorFlow', docsUrl: 'https://www.tensorflow.org/api_docs' },
        { name: 'Scikit-learn', docsUrl: 'https://scikit-learn.org/stable/documentation.html' },
        { name: 'NumPy', docsUrl: 'https://numpy.org/doc/' },
        { name: 'Pandas', docsUrl: 'https://pandas.pydata.org/docs/' },
        { name: 'OpenCV', docsUrl: 'https://docs.opencv.org/' },
        { name: 'Streamlit', docsUrl: 'https://docs.streamlit.io/' },
      ],
    },
    {
      label: 'Database',
      color: '#ce9178',
      skills: [
        { name: 'MongoDB', docsUrl: 'https://www.mongodb.com/docs/' },
        { name: 'MySQL', docsUrl: 'https://dev.mysql.com/doc/' },
        { name: 'Cassandra', docsUrl: 'https://cassandra.apache.org/doc/' },
        { name: 'Redis', docsUrl: 'https://redis.io/docs/' },
        { name: 'Neon', docsUrl: 'https://neon.tech/docs' },
        { name: 'PostgreSQL', docsUrl: 'https://www.postgresql.org/docs/' },
      ],
    },
    {
      label: 'DevOps & Cloud',
      color: '#dcdcaa',
      skills: [
        { name: 'AWS', docsUrl: 'https://docs.aws.amazon.com/' },
        { name: 'Docker', docsUrl: 'https://docs.docker.com/' },
        { name: 'Render', docsUrl: 'https://render.com/docs' },
        { name: 'Vercel', docsUrl: 'https://vercel.com/docs' },
      ],
    },
    {
      label: 'Tools',
      color: '#9cdcfe',
      skills: [
        { name: 'Git/GitHub', docsUrl: 'https://docs.github.com/' },
        { name: 'Postman', docsUrl: 'https://learning.postman.com/docs/getting-started/introduction/' },
        { name: 'IntelliJ', docsUrl: 'https://www.jetbrains.com/idea/documentation/' },
        { name: 'VS Code', docsUrl: 'https://code.visualstudio.com/docs' },
        { name: 'Anaconda', docsUrl: 'https://docs.anaconda.com/' },
        { name: 'Jupyter', docsUrl: 'https://docs.jupyter.org/' },
      ],
    },
  ],

  // ── Projects ──────────────────────────────────────────────────────────────────
  // Category order on the Projects page follows the order categories first appear here.
  projects: [
    // ── Web3 ──
    {
      id: 'dani-ai',
      name: 'dani.ai',
      category: 'Web3',
      description: 'Built at ETHGlobal Mumbai 2026. A marketplace where AI agents buy GPU time per job instead of per hour, with a guaranteed start time. Payment is held in Hedera escrow and refunded automatically if the job starts late, and agents in a hurry can buy an earlier place in the queue from agents that can wait.',
      tech: ['TypeScript', 'React', 'Hedera', 'Arkiv', 'x402', 'Node.js'],
      url: 'https://agent-hedera-arkiv.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/agent-hedera-arkiv',
      featured: true,
    },

    // ── Spring Boot ──
    {
      id: 'collabcode',
      name: 'CollabCode',
      category: 'Spring Boot',
      description: 'A real time collaborative code editor with a built in AI debugging agent. The agent uses Google Gemini and verifies its fixes by actually running the code.',
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
      tech: ['Python', 'python-telegram-bot', 'Google Gemini'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/KGBot',
      featured: false,
    },

    // ── Next.js and React ──
    {
      id: 'hire-orbit',
      name: 'HireOrbit',
      category: 'Next.js and React',
      description: 'A full stack recruitment portal with separate flows for recruiters and candidates, job management, subscriptions and professional networking.',
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
      tech: ['React'],
      url: 'https://organicconnect.vercel.app/',
      repo: 'https://github.com/Ayushpremrocks/Organic-Connect',
      featured: false,
    },

    // ── Java ──
    {
      id: 'certificate-generator',
      name: 'Certificate Generator',
      category: 'Java',
      description: 'A digital certificate generation system with QR code integration for authenticity verification.',
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
      tech: ['Java'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Library-management-system',
      featured: false,
    },

    // ── Hardware ──
    {
      id: 'ignite-fence',
      name: 'Ignite.fence',
      category: 'Hardware',
      description: 'IoT smart electric fencing and perimeter security monitoring system with real-time mobile alerts and telemetry.',
      tech: ['Arduino', 'ESP', 'Dart', 'PHP'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Ignite.fence',
      featured: false,
    },

    // ── Data Analytics ──
    {
      id: 'global-universities-success-analysis',
      name: 'Global Universities Success Analysis',
      category: 'Data Analytics',
      description: 'Explores university performance through interactive visualizations and statistical analysis.',
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
      tech: ['Power BI'],
      url: '',
      repo: 'https://github.com/Ayushpremrocks/Restaurant-Ratings-Analysis',
      featured: false,
    },
  ],

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
  ],

  // ── Education ─────────────────────────────────────────────────────────────────
  education: [
    {
      id: 'edu-1',
      school: 'Chandigarh University',
      degree: 'Bachelor of Engineering',
      field: 'Computer Science and Engineering',
      period: '2023 — Present',
      // gpa: '7.87',
      details: [
        'Winner: Tekathon 4.0 (Internal Round for Smart India Hackathon), Chandigarh University',
        '2nd Position: Code Quest 2.0, Chandigarh University',
        'Ranked 6th in college in the ICPC (International Collegiate Programming Contest) preliminary round',
        'Relevant Coursework: Data Structures & Algorithms, Object Oriented Programming, Operating Systems, Computer Networks, Database Management Systems, System Design, Software Engineering',
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
      school: 'Dr. Ulhas Patil English Medium School',
      degree: 'Intermediate',
      field: 'Science (Mathematics)',
      period: '2020 — 2022',
      details: [
        'Completed Intermediate education with a focus on Physics, Chemistry, and Mathematics.',
      ],
    },
    {
      id: 'edu-2',
      school: 'Kendriya Vidyalaya',
      degree: 'Matriculation',
      period: '2019 — 2020',
      details: [
        'Spent 9 years studying in various Kendriya Vidyalayas throughout the country.',
      ],
    },
  ],

  // ── Resume ───────────────────────────────────────────────────────────────────
  resumeUrl: '',
}
