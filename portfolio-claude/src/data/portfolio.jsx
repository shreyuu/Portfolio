// Portfolio data — single source of truth

const PORTFOLIO = {
  name: "Shreyash Meshram",
  role: "Full-Stack & AI Engineer",
  location: "Nottingham, UK",
  email: "shreyashmeshram0031@gmail.com",
  github: "https://github.com/shreyuu",
  linkedin: "https://www.linkedin.com/in/shreyuu/",
  resume: "/Shreyash-Meshram-Resume.pdf",

  tagline:
    "I build scalable backends, thoughtful interfaces, and applied-ML systems that solve actual problems.",

  intro:
    "Full-stack developer pursuing an MSc in Business Analytics at the University of Nottingham. I obsess over systems that are fast, correct, and a pleasure to use — from FastAPI services to React frontends to ML pipelines that ship.",

  about: [
    "I work at the seam between product and infrastructure. My favourite projects combine a real user need with enough technical depth to keep me learning — chess-board OCR, privacy-first expense tracking, stock-market sentiment pipelines.",
    "Right now I'm deepening my data-at-scale chops at Nottingham while freelancing on full-stack builds. I care about craft: well-labelled endpoints, honest loading states, tests that actually run.",
  ],

  experience: [
    {
      role: "Python Developer Intern",
      company: "Arohi Softwares",
      period: "Aug 2024 — Feb 2025",
      duration: "7 mo",
      blurb:
        "Built responsive Django UIs, integrated REST APIs, and owned schema design across a cross-functional Agile team.",
      outcomes: [
        "Reduced API response times ~40% via query batching + indexed lookups",
        "Shipped 6 feature releases on a weekly cadence with zero rollbacks",
      ],
      skills: ["Python", "Django", "REST API", "Postgres", "Agile"],
    },
    {
      role: "Software Developer Intern",
      company: "NerdTech",
      period: "Mar 2024 — Apr 2024",
      duration: "2 mo",
      blurb:
        "Shipped client software with a user-centric focus. Cut runtime errors through systematic debugging and test coverage.",
      outcomes: [
        "Cut runtime errors 30% by introducing end-to-end test harness",
        "Closed 22 backlog bugs in 6 weeks",
      ],
      skills: ["Software Dev", "Debugging", "Testing"],
    },
    {
      role: "ML with AI (Python) Trainee",
      company: "Knowledge Solutions India",
      period: "Dec 2021 — Feb 2022",
      duration: "3 mo",
      blurb:
        "Deployed an ML pipeline for a Heart Disease Predictor using scikit-learn and Pandas.",
      outcomes: [
        "Reduced partner inventory costs 15% via demand-forecasting model",
        "Achieved 89% recall on heart-disease classifier across 5-fold CV",
      ],
      skills: ["Python", "scikit-learn", "Pandas", "ML Deployment"],
    },
  ],

  education: [
    {
      school: "University of Nottingham",
      degree: "MSc, Business Analytics",
      period: "Sep 2025 — Sep 2026",
      place: "Jubilee Campus, Nottingham, UK",
      notes: [
        "Foundational Business Analytics",
        "Leading Big Data Business Projects",
        "Data at Scale: Management & Processing",
        "Machine Learning & Predictive Analytics",
        "Data-Driven Dissertation",
      ],
    },
    {
      school: "Sandip Institute of Technology & Research Centre",
      degree: "BE, Computer Engineering",
      period: "2022 — 2025",
      place: "Nashik, Maharashtra, India",
      notes: [
        "Data Structures & Algorithms",
        "Machine Learning & Deep Learning",
        "Database Management Systems",
        "Cloud Computing",
        "Software Engineering",
      ],
    },
    {
      school: "Sandip Polytechnic",
      degree: "Diploma, Computer Engineering",
      period: "2019 — 2022",
      place: "Nashik, India",
      notes: [
        "OOP · Java · Python",
        "Database Management",
        "Mobile App Development",
        "Networks · Operating Systems",
      ],
    },
  ],

  skills: [
    {
      label: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "Java", "C / C++", "SQL"],
    },
    {
      label: "Backend",
      items: ["FastAPI", "Django", "Flask", "REST", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Frontend",
      items: ["React", "Tailwind", "Vite", "Framer Motion"],
    },
    {
      label: "Data & ML",
      items: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "LangChain", "MediaPipe"],
    },
    {
      label: "Cloud & Ops",
      items: ["AWS", "GCP", "Azure", "Docker", "Git"],
    },
  ],

  projects: [
    {
      n: "01",
      title: "ZenSpend",
      kind: "Full-Stack · Applied LLM",
      year: "2025",
      blurb:
        "Privacy-first, AI-powered expense tracker. FastAPI backend with LangChain and pgvector, running a local Llama via Ollama so your financial data never leaves the machine.",
      highlights: [
        "Local-first LLM — no third-party API",
        "Vector search over transactions with pgvector",
        "React + Tailwind client, categorisation workflow",
      ],
      stack: ["FastAPI", "LangChain", "pgvector", "Ollama", "React", "Tailwind"],
      href: "https://github.com/shreyuu/ZenSpend",
      featured: true,
    },
    {
      n: "02",
      title: "FENgine",
      kind: "Computer Vision · ML",
      year: "2024",
      blurb:
        "Chess-board OCR pipeline that turns a photograph into a FEN string and replayable PGN. Perspective correction with OpenCV, piece classification via a small CNN.",
      highlights: [
        "Board detection + perspective transform",
        "CNN piece classifier, ~97% val accuracy",
        "FastAPI service with React playground",
      ],
      stack: ["FastAPI", "OpenCV", "CNN", "PyTorch", "React"],
      href: "https://github.com/shreyuu/FENgine",
      featured: true,
    },
    {
      n: "03",
      title: "FinCast AI",
      kind: "Full-Stack · ML",
      year: "2024",
      blurb:
        "Market-analysis platform blending technical indicators, an SVM price predictor, and FinBERT-driven news sentiment — all wired into a TypeScript React dashboard.",
      highlights: [
        "FinBERT sentiment on live news feeds",
        "SVM price-movement classifier",
        "Pandas-powered indicator engine",
      ],
      stack: ["FastAPI", "React", "TypeScript", "scikit-learn", "FinBERT", "Vite"],
      href: "https://github.com/shreyuu/FinCastAI",
      featured: true,
    },
    {
      n: "04",
      title: "Rubiklog",
      kind: "Full-Stack · CV",
      year: "2024",
      blurb:
        "A Rubik's Cube timer with computer-vision scramble detection.",
      stack: ["Django", "React", "Postgres", "OpenCV", "TensorFlow"],
      href: "https://github.com/shreyuu/RubikLog",
    },
    {
      n: "05",
      title: "AmazeBot",
      kind: "Full-Stack · LLM",
      year: "2024",
      blurb:
        "Conversational chatbot wired to Hugging Face Blenderbot with a Django REST backend.",
      stack: ["Django", "React", "HF API", "REST"],
      href: "https://github.com/shreyuu/AmazeBot",
    },
    {
      n: "06",
      title: "DjangoChatify",
      kind: "Real-time",
      year: "2024",
      blurb:
        "Real-time WebSocket chat app — channels, rooms, presence, containerised.",
      stack: ["Django Channels", "React", "WebSockets", "Postgres", "Docker"],
      href: "https://github.com/shreyuu/DjangoChatify",
    },
    {
      n: "07",
      title: "Hand Gesture Recognition",
      kind: "Computer Vision",
      year: "2023",
      blurb:
        "Real-time hand-sign detection with MediaPipe, audio feedback via gTTS.",
      stack: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "gTTS"],
      href: "https://github.com/shreyuu/Hand-Gesture-Recognition",
    },
    {
      n: "08",
      title: "Posture Recognition",
      kind: "ML",
      year: "2023",
      blurb:
        "CNN-based sitting/standing detector with a matplotlib evaluation report.",
      stack: ["Python", "TensorFlow", "CNN", "scikit-learn"],
      href: "https://github.com/shreyuu/ml-models",
    },
    {
      n: "09",
      title: "Expense Analytics",
      kind: "Full-Stack",
      year: "2023",
      blurb:
        "Minimal expense tracker with a MERN-stack core and a focus on usable charts.",
      stack: ["React", "Express", "MongoDB", "Tailwind"],
      href: "https://github.com/shreyuu/expense-analytics-react",
    },
    {
      n: "10",
      title: "TempTracker",
      kind: "Web",
      year: "2022",
      blurb:
        "Current-temperature web app backed by OpenWeatherMap.",
      stack: ["Django", "React", "Tailwind", "OWM"],
      href: "https://github.com/shreyuu/TempTracker",
    },
  ],
};

window.PORTFOLIO = PORTFOLIO;
