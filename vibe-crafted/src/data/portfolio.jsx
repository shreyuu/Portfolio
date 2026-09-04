// Portfolio data — single source of truth

export const PORTFOLIO = {
  name: "Shreyash Meshram",
  role: "Full-Stack & AI Engineer",
  location: "Nottingham, UK",
  email: "shreyashmeshram0031@gmail.com",
  github: "https://github.com/shreyuu",
  linkedin: "https://www.linkedin.com/in/shreyuu/",
  resume: "./Shreyash-Meshram-Resume.pdf",

  tagline:
    "I build scalable backends, thoughtful interfaces, and applied-ML systems that solve actual problems.",

  intro:
    "Full-stack developer pursuing an MSc in Business Analytics at the University of Nottingham. I obsess over systems that are fast, correct, and a pleasure to use — from FastAPI services to React frontends to ML pipelines that ship.",

  about: [
    "I work across product and infrastructure — backend services, ML pipelines, and the interfaces sitting on top. The projects I keep coming back to mix a real user need with enough technical depth to keep me curious: chess-board OCR, privacy-first expense tracking, BFSI sentiment pipelines, retail customer segmentation.",
    "Right now I'm at Nottingham deepening data-at-scale and predictive-analytics work, and writing applied-AI experiments in evenings. I care about craft — well-labelled endpoints, honest loading states, tests that actually run — and I'm open to part-time and graduate roles where that mindset is welcome.",
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
        "Data at Scale: Management, Processing & Visualisation",
        "Foundational Business Analytics",
        "Supply Chain Planning & Management",
        "Analytics Specializations and Applications",
        "Leading Big Data Business Projects",
        "Machine Learning and Predictive Analytics",
        "Advanced Operations Analysis",
        "Data-Driven Dissertation Project",
      ],
    },
    {
      school: "Sandip Institute of Technology & Research Centre",
      degree: "BE, Computer Engineering",
      period: "2022 — 2025",
      place: "Nashik, Maharashtra, India",
      notes: [
        "Data Structures & Algorithms · Design & Analysis of Algorithms",
        "Machine Learning · Deep Learning · High Performance Computing",
        "Database Management Systems · Theory of Computation",
        "Operating Systems · System Programming · Computer Networks & Security",
        "Software Engineering · Software Testing & Quality Assurance",
        "Web Technology · Cloud Computing · Internet of Things",
        "Artificial Intelligence · Data Science & Big Data Analytics",
        "Blockchain · Cyber Security & Digital Forensics · Software Defined Networks",
        "Business Intelligence · Social Media Analytics",
        "Discrete Mathematics · Engineering Mathematics III",
        "Microprocessor · Digital Electronics & Logic Design",
        "OOP · Computer Graphics · Principles of Programming Languages",
      ],
    },
    {
      school: "Sandip Polytechnic",
      degree: "Diploma, Computer Engineering",
      period: "2019 — 2022",
      place: "Nashik, India",
      notes: [
        "Programming in C · OOP · Java · Advance Java · Python",
        "Data Structures Using C · Software Engineering · Software Testing",
        "Database Management · Operating Systems · Microprocessor",
        "Computer Graphics · Digital Techniques · Basic Electronics",
        "Data Communication & Computer Networks · Advance Computer Networks",
        "Client-Side Scripting · PHP · Mobile Application Development",
        "Applied Mathematics · Basic Science · Emerging Trends · Management",
      ],
    },
  ],

  // Simplified to 4 minimal categories
  skills: [
    {
      label: "Languages & Tools",
      items: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "Git", "Docker"],
    },
    {
      label: "Backend & Frameworks",
      items: ["FastAPI", "Django", "Flask", "React", "TailwindCSS", "REST APIs"],
    },
    {
      label: "Data Science & ML",
      items: ["TensorFlow", "Scikit-learn", "Pandas", "MediaPipe", "NumPy"],
    },
    {
      label: "Cloud & Databases",
      items: ["AWS", "Google Cloud", "Microsoft Azure", "Firebase", "PostgreSQL", "MongoDB", "MySQL"],
    },
  ],

  // Equalised cards: no `featured`, no `kind`, no `year`. Just title, blurb, stack, href, optional highlights.
  projects: [
    {
      // Numbered 00: current work, ahead of the shipped 01—17 series (whose
      // case studies are a self-contained "NN / 17" set).
      n: "00",
      title: "Identifying feature drift using variable importance and MCR",
      domain: "ML",
      status: "MSc 2026",
      blurb:
        "MSc dissertation, University of Nottingham. Detecting feature drift by watching how a model uses its variables, rather than waiting for accuracy to fall — three detectors built and scored against the standard drift-detection baselines.",
      highlights: [
        "Three detectors: SHAP/permutation importance shift, Random Forest vote-dominance, and an MCR/Rashomon-set monitor",
        "Benchmarked against DDM, ADWIN, Page–Hinkley and a KS test on the driftDatasets concept-drift streams",
        "Scored on detection delay, false-alarm rate, and lead time before performance degrades",
      ],
      stack: ["Python", "scikit-learn", "SHAP", "River"],
      href: "https://github.com/shreyuu/UoN-Business-Analytics/tree/main/Dissertation",
    },
    {
      n: "01",
      title: "ZenSpend",
      domain: "LLM",
      blurb:
        "Privacy-first, AI-powered expense tracker. FastAPI backend with LangChain and pgvector, running a local Llama via Ollama so financial data never leaves the machine.",
      highlights: [
        "Local-first LLM — no third-party API",
        "Vector search over transactions with pgvector",
        "React + Tailwind client, categorisation workflow",
      ],
      stack: ["FastAPI", "LangChain", "pgvector", "Ollama", "React", "Tailwind"],
      href: "https://github.com/shreyuu/ZenSpend",
      caseStudy: "case-studies/zenspend.html",
    },
    {
      n: "02",
      title: "FENgine",
      domain: "Vision",
      blurb:
        "Chess-board OCR pipeline that turns a photograph into a FEN string and replayable PGN. Perspective correction with OpenCV, piece classification via a small CNN.",
      highlights: [
        "Board detection + perspective transform",
        "CNN piece classifier, ~97% val accuracy",
        "FastAPI service with React playground",
      ],
      stack: ["FastAPI", "OpenCV", "CNN", "PyTorch", "React"],
      href: "https://github.com/shreyuu/FENgine",
      caseStudy: "case-studies/fengine.html",
    },
    {
      n: "03",
      title: "FinCast AI",
      domain: "ML",
      blurb:
        "Market-analysis platform blending technical indicators, an SVM price predictor, and FinBERT-driven news sentiment — all wired into a TypeScript React dashboard.",
      highlights: [
        "FinBERT sentiment on live news feeds",
        "SVM price-movement classifier",
        "Pandas-powered indicator engine",
      ],
      stack: ["FastAPI", "React", "TypeScript", "scikit-learn", "FinBERT"],
      href: "https://github.com/shreyuu/FinCastAI",
      caseStudy: "case-studies/fincast-ai.html",
    },
    {
      n: "04",
      title: "BFSI Sentiment Analysis",
      domain: "ML",
      blurb:
        "End-to-end NLP solution classifying banking & insurance news headlines as positive, negative, or neutral. Traditional ML, gradient-boosted ensembles, and BERT compared on the same pipeline.",
      highlights: [
        "Ensemble models reaching ~95% accuracy",
        "TF-IDF + n-grams with domain-specific stopwords",
        "BERT fine-tune for the hardest cases",
      ],
      stack: ["Python", "scikit-learn", "XGBoost", "LightGBM", "BERT", "Pandas"],
      href: "https://github.com/shreyuu/BFSI-NLP-Hackathon",
      caseStudy: "case-studies/bfsi-sentiment.html",
    },
    {
      n: "05",
      title: "Retail Customer Segmentation",
      domain: "Data",
      blurb:
        "Clustered 3,000 retail customers from six months of loyalty-card data into five interpretable segments — Core Grocery, Tobacco Convenience, Cashpoint Users, Drinks & Tobacco, Lottery-Focused.",
      highlights: [
        "Behavioural features from basket + line-item data",
        "Winsorisation, log-transform, RobustScaler, PCA",
        "K-Means with silhouette and elbow validation",
      ],
      stack: ["Python", "Pandas", "scikit-learn", "PCA", "K-Means", "Matplotlib"],
      href: "https://github.com/shreyuu/retail-customer-segmentation",
      caseStudy: "case-studies/retail-segmentation.html",
    },
    {
      n: "06",
      title: "FoodCorp Store KPI Analysis",
      domain: "Data",
      blurb:
        "Customer-focused KPI study comparing four UK retail stores. SQL views, Databricks notebooks, and Tableau dashboards measuring acquisition, retention, revenue, and growth — recommending London Leadenhall Street for further investment.",
      highlights: [
        "SQL KPI views on £1.29M of transactions",
        "Tableau dashboards across four stores",
        "~90% repeat-purchase rate identified at top store",
      ],
      stack: ["SQL", "Databricks", "Tableau", "Python", "Pandas"],
      href: "https://github.com/shreyuu/foodcorp-store-kpi-analysis",
      caseStudy: "case-studies/foodcorp-kpi.html",
    },
    {
      n: "07",
      title: "Business Risk Prediction Pipeline",
      domain: "ML",
      blurb:
        "Full predictive-analytics workflow for a Foundational Business Analytics module: data prep, exploratory analysis, model training, calibration, and explainable decision-tree visualisation.",
      highlights: [
        "Preprocessing + modelling pipeline saved end-to-end",
        "Calibrated final pipeline for honest probabilities",
        "Decision-tree visualisation for stakeholder explanation",
      ],
      stack: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Joblib"],
      href: "https://github.com/shreyuu/business-risk-prediction-pipeline",
      caseStudy: "case-studies/business-risk-pipeline.html",
    },
    {
      n: "08",
      title: "Bluesky Brand Intelligence",
      domain: "Data",
      blurb:
        "Comparative analytics of Wired vs The Verge on Bluesky: collection, cleaning, sentiment, LDA topic modelling, keyword networks, micro-influencer scoring, and a brand perceptual map.",
      highlights: [
        "Seven-stage notebook pipeline, end-to-end",
        "LDA topic models + keyword network centrality",
        "Micro-influencer scoring + perceptual map",
      ],
      stack: ["Python", "NLTK", "Gensim", "NetworkX", "scikit-learn", "Matplotlib"],
      href: "https://github.com/shreyuu/bluesky-brand-intelligence",
      caseStudy: "case-studies/bluesky-brand-intelligence.html",
    },
    {
      n: "09",
      title: "Statveil",
      domain: "App",
      blurb:
        "Solo-Leveling-inspired productivity gamification app in Flutter. Track daily quests, level up character stats (STR, INT, AGI, VIT, WILL), maintain streaks, and survive a daily reset that punishes missed quests.",
      highlights: [
        "Cross-platform — iOS, Android, web, desktop",
        "EXP curve with quest difficulty tiers",
        "Streak system + automatic daily reset",
      ],
      stack: ["Flutter", "Dart", "Material 3"],
      href: "https://github.com/shreyuu/Statveil",
      caseStudy: "case-studies/statveil.html",
    },
    {
      n: "10",
      title: "Brainfarts & Benchmarks",
      domain: "Systems",
      blurb:
        "A public playground of curiosity-driven coding experiments — micro-benchmarks, 'why is this faster?' probes, and one-off scripts that exist purely because the question wouldn't go away.",
      highlights: [
        "Python timeit micro-benchmarks",
        "One folder per idea — useful or otherwise",
        "Public-experimenting as a learning loop",
      ],
      stack: ["Python", "Jupyter", "timeit"],
      href: "https://github.com/shreyuu/brainfarts-and-benchmarks",
      caseStudy: "case-studies/brainfarts-and-benchmarks.html",
    },
    {
      n: "11",
      title: "Rubiklog",
      domain: "Vision",
      blurb:
        "A Rubik's Cube timer with computer-vision scramble detection — Django backend, React client, OpenCV pipeline.",
      stack: ["Django", "React", "Postgres", "OpenCV", "TensorFlow"],
      href: "https://github.com/shreyuu/RubikLog",
      caseStudy: "case-studies/rubiklog.html",
    },
    {
      n: "12",
      title: "AmazeBot",
      domain: "LLM",
      blurb:
        "Conversational chatbot wired to Hugging Face Blenderbot with a Django REST backend.",
      stack: ["Django", "React", "HF API", "REST"],
      href: "https://github.com/shreyuu/AmazeBot",
      caseStudy: "case-studies/amazebot.html",
    },
    {
      n: "13",
      title: "DjangoChatify",
      domain: "Systems",
      blurb:
        "Real-time WebSocket chat app — channels, rooms, presence, containerised.",
      stack: ["Django Channels", "React", "WebSockets", "Postgres", "Docker"],
      href: "https://github.com/shreyuu/DjangoChatify",
      caseStudy: "case-studies/djangochatify.html",
    },
    {
      n: "14",
      title: "Hand Gesture Recognition",
      domain: "Vision",
      blurb:
        "Real-time hand-sign detection with MediaPipe, audio feedback via gTTS.",
      stack: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "gTTS"],
      href: "https://github.com/shreyuu/Hand-Gesture-Recognition",
      caseStudy: "case-studies/hand-gesture-recognition.html",
    },
    {
      n: "15",
      title: "Posture Recognition",
      domain: "Vision",
      blurb:
        "CNN-based sitting/standing detector with a matplotlib evaluation report.",
      stack: ["Python", "TensorFlow", "CNN", "scikit-learn"],
      href: "https://github.com/shreyuu/ml-models",
      caseStudy: "case-studies/posture-recognition.html",
    },
    {
      n: "16",
      title: "Expense Analytics",
      domain: "App",
      blurb:
        "Minimal expense tracker with a MERN-stack core and a focus on usable charts.",
      stack: ["React", "Express", "MongoDB", "Tailwind"],
      href: "https://github.com/shreyuu/expense-analytics-react",
      caseStudy: "case-studies/expense-analytics.html",
    },
    {
      n: "17",
      title: "TempTracker",
      domain: "App",
      blurb:
        "Current-temperature web app backed by OpenWeatherMap.",
      stack: ["Django", "React", "Tailwind", "OWM"],
      href: "https://github.com/shreyuu/TempTracker",
      caseStudy: "case-studies/temptracker.html",
    },
  ],
};
