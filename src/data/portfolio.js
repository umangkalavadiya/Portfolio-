export const profile = {
  name: 'Umang Kalavadiya',
  title: 'AI/ML Engineer',
  tagline: 'Building scalable AI systems at the intersection of NLP, GenAI, and Computer Vision.',
  email: 'umang.kalavadiya@gmail.com',
  phone: '+91-6351301322',
  github: 'https://github.com/umangkalavadiya',
  linkedin: 'https://linkedin.com/in/umangkalavadiya',
  location: 'India'
}

export const experience = [
  {
    id: 'e2m',
    role: 'AI Executor',
    company: 'E2M Solutions',
    period: 'Oct 2025 — Present',
    highlights: [
      'Led a 5-member AI engineering team driving project planning, execution, and delivery.',
      'Delivered 10+ end-to-end n8n automation solutions for international clients.',
      'Designed and deployed RAG and CAG pipelines along with custom AI agents.',
      'Technical decision-maker for architecture, tooling, model selection, and optimization.',
      'Managed direct communication with UK and US clients for requirement gathering.'
    ]
  },
  {
    id: 'msbc',
    role: 'Junior AI/ML Engineer',
    company: 'MSBC Group',
    period: 'May 2025 — Sept 2025',
    highlights: [
      'Delivered 5+ end-to-end AI Proofs-of-Concept for enterprise clients across multiple domains.',
      'Built and optimized RAG pipelines to improve response relevance and latency.',
      'Developed advanced image preprocessing pipelines using edge detection and SAM at 90%+ accuracy.',
      'Optimized prompts and LLM interactions to enhance response quality and consistency.',
      'Mentored interns and led cross-functional collaboration from ideation to deployment.'
    ]
  },
  {
    id: 'intralign',
    role: 'AI Engineer',
    company: 'Intralign.ai',
    period: 'Jan 2024 — Mar 2025',
    highlights: [
      'Integrated OpenAI APIs and optimized prompts, reducing output errors by 27%.',
      'Designed and deployed Rasa-based chatbots for 20+ business use cases.',
      'Assisted ML teams in dataset creation and model training, improving accuracy by 20%.',
      'Built AI agents using FlowiseAI and LangChain for complex multi-step workflows.'
    ]
  }
]

export const projects = [
  {
    id: 'yt-summarizer',
    name: 'YT Summarizer',
    description: 'YouTube video summarization system using TF-IDF vectorization and Hugging Face BART for context-aware summaries.',
    tags: ['NLP', 'BART', 'TF-IDF', 'Hugging Face'],
    metric: 'Context-aware'
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'AI-powered cover letter generator using Flask and OpenAI GPT API to create personalized letters from job descriptions.',
    tags: ['GenAI', 'Flask', 'OpenAI', 'GPT'],
    metric: 'Personalized'
  },
  {
    id: 'mood-sense',
    name: 'Mood Sense',
    description: 'Real-time student emotion detection using computer vision and deep learning.',
    tags: ['Computer Vision', 'Deep Learning', 'CNN'],
    metric: '73% accuracy'
  },
  {
    id: 'fin-sentiment',
    name: 'Financial Sentiment Analysis',
    description: 'Sentiment prediction models for financial statements with strong predictive accuracy.',
    tags: ['NLP', 'Sentiment', 'Finance'],
    metric: '87% accuracy'
  },
  {
    id: 'plate-detect',
    name: 'License Plate Detection',
    description: 'Indian license plate detection using NASNetLarge. Authored an accompanying research paper.',
    tags: ['Computer Vision', 'NASNetLarge', 'Research'],
    metric: '95% / 83%'
  }
]

export const skills = [
  {
    id: 'genai',
    name: 'Generative AI',
    icon: 'sparkles',
    blurb: 'LLMs, RAG, agents, and the orchestration around them.',
    items: [
      { name: 'RAG', level: 95 },
      { name: 'LangChain', level: 92 },
      { name: 'LangGraph', level: 85 },
      { name: 'Prompt Engineering', level: 95 },
      { name: 'LLM Fine-tuning', level: 80 },
      { name: 'OpenAI APIs', level: 95 },
      { name: 'Gemini API', level: 85 },
      { name: 'Hugging Face', level: 90 },
      { name: 'CrewAI', level: 80 },
      { name: 'FlowiseAI', level: 85 },
      { name: 'RASA', level: 85 },
      { name: 'GPT / BERT / T5', level: 88 }
    ]
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    icon: 'brain',
    blurb: 'Classical ML to deep nets — regression to RNNs.',
    items: [
      { name: 'CNN', level: 92 },
      { name: 'RNN', level: 85 },
      { name: 'ANN', level: 90 },
      { name: 'NLP', level: 93 },
      { name: 'Classification', level: 92 },
      { name: 'Regression', level: 90 },
      { name: 'Clustering', level: 85 },
      { name: 'Model Optimization', level: 88 },
      { name: 'Hyperparameter Tuning', level: 88 },
      { name: 'Time Series', level: 80 }
    ]
  },
  {
    id: 'code',
    name: 'Programming',
    icon: 'code',
    blurb: 'The languages and frameworks I reach for daily.',
    items: [
      { name: 'Python', level: 96 },
      { name: 'JavaScript', level: 80 },
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 88 },
      { name: 'Keras', level: 88 },
      { name: 'OpenCV', level: 90 },
      { name: 'FastAPI', level: 88 },
      { name: 'Flask', level: 92 },
      { name: 'NumPy', level: 95 },
      { name: 'Pandas', level: 95 }
    ]
  },
  {
    id: 'db',
    name: 'Databases',
    icon: 'database',
    blurb: 'Vector stores for retrieval, SQL/NoSQL for everything else.',
    items: [
      { name: 'ChromaDB', level: 92 },
      { name: 'Pinecone', level: 88 },
      { name: 'FAISS', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Supabase', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 80 }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: 'server',
    blurb: 'Containers, CI/CD, and AWS infra to ship it.',
    items: [
      { name: 'Docker', level: 90 },
      { name: 'Docker Compose', level: 88 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'AWS EC2', level: 85 },
      { name: 'AWS S3', level: 88 },
      { name: 'AWS Lambda', level: 82 },
      { name: 'AWS ECS', level: 80 }
    ]
  }
]

export const certifications = [
  'IBM Data Scientist Certification',
  'TensorFlow Deep Learning',
  'Computer Vision',
  'Deep Learning with Keras',
  'GANs and Diffusion Models',
  'Azure Fundamentals',
  'Kaggle Python & Data Visualization'
]

export const education = [
  {
    degree: 'B.Tech in Computer Science (Big Data Analytics)',
    school: 'Parul Institute of Engineering and Technology',
    period: '2021 — 2024',
    grade: 'CGPA: 8.4'
  },
  {
    degree: 'Diploma in Computer Engineering',
    school: 'The Maharaja Sayajirao University',
    period: '2017 — 2021',
    grade: '85.8%'
  }
]

// Knowledge graph nodes & edges
export const graphData = {
  nodes: [
    // Center
    { id: 'umang', label: 'Umang', type: 'self', size: 28, group: 0 },

    // Top-level domains
    { id: 'genai', label: 'Generative AI', type: 'domain', size: 18, group: 1 },
    { id: 'nlp', label: 'NLP', type: 'domain', size: 16, group: 1 },
    { id: 'cv', label: 'Computer Vision', type: 'domain', size: 16, group: 1 },
    { id: 'ml', label: 'Machine Learning', type: 'domain', size: 17, group: 1 },
    { id: 'devops', label: 'DevOps', type: 'domain', size: 14, group: 1 },

    // Tools / frameworks
    { id: 'langchain', label: 'LangChain', type: 'tool', size: 11, group: 2 },
    { id: 'rag', label: 'RAG', type: 'tool', size: 12, group: 2 },
    { id: 'openai', label: 'OpenAI', type: 'tool', size: 11, group: 2 },
    { id: 'pytorch', label: 'PyTorch', type: 'tool', size: 11, group: 2 },
    { id: 'tensorflow', label: 'TensorFlow', type: 'tool', size: 11, group: 2 },
    { id: 'opencv', label: 'OpenCV', type: 'tool', size: 10, group: 2 },
    { id: 'sam', label: 'SAM', type: 'tool', size: 10, group: 2 },
    { id: 'huggingface', label: 'Hugging Face', type: 'tool', size: 11, group: 2 },
    { id: 'docker', label: 'Docker', type: 'tool', size: 10, group: 2 },
    { id: 'aws', label: 'AWS', type: 'tool', size: 11, group: 2 },
    { id: 'python', label: 'Python', type: 'tool', size: 13, group: 2 },

    // Companies
    { id: 'e2m-c', label: 'E2M Solutions', type: 'company', size: 13, group: 3 },
    { id: 'msbc-c', label: 'MSBC Group', type: 'company', size: 12, group: 3 },
    { id: 'intralign-c', label: 'Intralign.ai', type: 'company', size: 12, group: 3 },

    // Projects
    { id: 'p-yt', label: 'YT Summarizer', type: 'project', size: 9, group: 4 },
    { id: 'p-cl', label: 'Cover Letter Gen', type: 'project', size: 9, group: 4 },
    { id: 'p-mood', label: 'Mood Sense', type: 'project', size: 9, group: 4 },
    { id: 'p-fin', label: 'Fin Sentiment', type: 'project', size: 9, group: 4 },
    { id: 'p-plate', label: 'Plate Detect', type: 'project', size: 9, group: 4 }
  ],
  links: [
    // Self to domains
    { source: 'umang', target: 'genai' },
    { source: 'umang', target: 'nlp' },
    { source: 'umang', target: 'cv' },
    { source: 'umang', target: 'ml' },
    { source: 'umang', target: 'devops' },

    // Self to companies
    { source: 'umang', target: 'e2m-c' },
    { source: 'umang', target: 'msbc-c' },
    { source: 'umang', target: 'intralign-c' },

    // Domain -> tools
    { source: 'genai', target: 'langchain' },
    { source: 'genai', target: 'rag' },
    { source: 'genai', target: 'openai' },
    { source: 'genai', target: 'huggingface' },
    { source: 'nlp', target: 'huggingface' },
    { source: 'nlp', target: 'rag' },
    { source: 'cv', target: 'opencv' },
    { source: 'cv', target: 'sam' },
    { source: 'ml', target: 'pytorch' },
    { source: 'ml', target: 'tensorflow' },
    { source: 'ml', target: 'python' },
    { source: 'devops', target: 'docker' },
    { source: 'devops', target: 'aws' },

    // Projects to domains
    { source: 'p-yt', target: 'nlp' },
    { source: 'p-yt', target: 'huggingface' },
    { source: 'p-cl', target: 'genai' },
    { source: 'p-cl', target: 'openai' },
    { source: 'p-mood', target: 'cv' },
    { source: 'p-fin', target: 'nlp' },
    { source: 'p-plate', target: 'cv' },

    // Companies to domains
    { source: 'e2m-c', target: 'genai' },
    { source: 'e2m-c', target: 'rag' },
    { source: 'msbc-c', target: 'cv' },
    { source: 'msbc-c', target: 'rag' },
    { source: 'intralign-c', target: 'genai' },
    { source: 'intralign-c', target: 'langchain' }
  ]
}
