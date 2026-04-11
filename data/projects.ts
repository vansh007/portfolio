export interface Project {
  title: string;
  description: string;
  type: "fullstack" | "mobile" | "ai";
  technologies: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
  title: "QuantumGuard AI – Post-Quantum Migration Intelligence for IoT",
  description:
    "Built an end-to-end quantum-aware security platform that analyzes IoT data metadata to predict cryptographic risk and generate cost-optimized migration strategies for classical, hybrid, and post-quantum cryptography. Implemented ML-based risk classification, policy-driven migration planning, and real cryptographic benchmarking of RSA, ECC, and Kyber. Designed a Flask REST API with CSV ingestion, explainable risk reports, and exportable migration roadmaps, enabling enterprises to plan secure and efficient transitions to post-quantum cryptography.",
  type: "fullstack",
  technologies: [
    "Python",
    "Flask",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Post-Quantum Cryptography (Kyber)",
    "RSA / ECC",
    "REST APIs",
    "Machine Learning",
  ],
  image: "/project/quantumguard.png",
  demoUrl: "https://cryptiota-j12o-1xgg47au8-vanshs-projects-4b7d4bfd.vercel.app/", 
  codeUrl: "https://github.com/vansh007/cryptiota",
},
  {
    title: "SolBallot — Decentralized Voting",
    description:
      "A secure, decentralized voting protocol built on the Solana blockchain through transparent proposal and voting systems backed by an on-chain treasury. Features token-based voting, automated treasury management, and a high-trust dark-mode UI.",
    type: "fullstack",
    technologies: [
      "Solana",
      "Anchor",
      "Rust",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Solana Wallet Adapter",
    ],
    image: "/project/solballot.png",
    demoUrl: "https://solballot.vercel.app",
    codeUrl: "https://github.com/vanshmundhra9120/solballot",
  },

  {
    title: "devrunner — Universal Task Runner",
    description:
      "A blazing-fast CLI tool that automatically detects your project's build tools and runs commands universally across any programming ecosystem. Written in Rust, it features smart recursive detection, lockfile conflict resolution, and background self-updating. Supports 12+ ecosystems including Node, Rust, Python, Go, and Java.",
    type: "fullstack",
    technologies: [
      "Rust",
      "Clap",
      "Tokio",
      "Reqwest",
      "Serde",
      "Terminal UI",
      "GitHub Actions",
    ],
    image: "/project/devrunner.png",
    demoUrl: "https://devrunner-cli.vercel.app",
    codeUrl: "https://github.com/vanshmundhra9120/devrunner",
  },
  {
    title: "TestGen- AI-Powered Multi-Language Test Generation CLI",
    description:
      "TestGen automatically generates production-ready tests for source code across JavaScript/TypeScript, Python, Go, and Rust using LLM APIs (Anthropic Claude, OpenAI GPT, Google Gemini, Groq). Features Interactive TUI Mode, Multi-Language Support, Multiple Test Types, Framework Aware generation, Cost Optimization, and CI/CD Readiness.",
    type: "fullstack",
    technologies: [
      "Go",
      "Cobra",
      "Viper",
      "LLM APIs",
      "TUI",
      "CI/CD",
      "Rust",
      "Python",
      "TypeScript",
    ],
    image: "/project/testgen-cli.png",
    demoUrl: "https://testgen-cli.vercel.app/",
    codeUrl: "https://github.com/vanshmundhra9120/testgen-cli",
  },
  {
    title: "CrowdSolFunding — Web3 Crowdfunding",
    description:
      "Revolutionize crowdfunding through transparent, secure, and decentralized Web3 technology. Empowers innovation by connecting creators directly with backers using blockchain, ensuring trust and transparency in every transaction.",
    type: "fullstack",
    technologies: [
      "Solana",
      "Anchor",
      "Rust",
      "React",
      "TypeScript",
      "Web3.js",
      "Solana Wallet Adapter",
    ],
    image: "/project/crowdsolfund.png",
    demoUrl: "https://crowdsolfund.vercel.app",
    codeUrl: "https://github.com/vanshmundhra9120/crowdsolfund",
  },
  {
    title: "Solana Copilot AI",
    description: "Your AI FinancialAdvisor on Solana - An AI-powered platform that provides personalized financial advice and investment strategies on the Solana blockchain. Leveraging OpenAI's GPT models and Solana's fast, low-cost transactions, Solana Copilot AI helps users make informed decisions about their crypto investments. ",
    type: "ai",
    technologies: [
      "Nextjs",
      "Solana",
      "Blockchain",
      "FastAPI",
      "OpenAI DALL",
      "Anchor",
      "Rust"
    ]
    , image:
      "/project/solanaai.png",
    demoUrl: "https://solana-copilot-tan.vercel.app",
    codeUrl: "https://github.com/vanshmundhra9120/solana-copilot",
  },
  // {
  //   title: "Perception- Agentic Chatbot",
  //   description:
  //     "A dynamic AI chatbot that handles multi-step tasks and contextual conversations using LangGraph agents and Groq inference. It combines LangChain orchestration with Streamlit UI for a clean and powerful workflow.",
  //   type: "ai",
  //   technologies: [
  //     "LangGraph",
  //     "LangChain",
  //     "Groq",
  //     "Python",
  //     "Streamlit",
  //     "FastAPI",
  //     "React",
  //   ],
  //   image: "/project/perception.png",
  //   demoUrl: "https://perception.vanshmundhra.dev",
  //   codeUrl: "https://github.com/vanshmundhra9120/perception",
  // },
  // {
  //   title: "Voice Agent AI",
  //   description:
  //     "A voice agent that can answer questions and provide information using natural language processing.",
  //   type: "ai",
  //   technologies: [
  //     "Python",
  //     "LangChain",
  //     "OpenAI",
  //     "Nextjs",
  //     "Nestjs",
  //     "TypeScript",
  //   ],
  //   image: "/project/voiceagent.png",
  //   demoUrl: "https://voiceagent.vanshmundhra.dev",
  //   codeUrl: "https://github.com/vanshmundhra9120/voice-agent",
  // },
  // {
  //   title: "EcoQuest",
  //   description:
  //     "AI-driven waste reporting system that reduced response time by 30% through image-based reporting.",
  //   type: "fullstack",
  //   technologies: [
  //     "Next.js",
  //     "Drizzle ORM",
  //     "PostgreSQL",
  //     "Gemini Vision API",
  //     "Google Maps API",
  //   ],
  //   image: "/project/ecoquest.png",
  //   demoUrl: "https://ecoquest.vanshmundhra.dev/",
  //   codeUrl: "https://github.com/prncemundhra9120/ecoquest",
  // },
  {
    title: "DataInsight-SQL AI Agent",
    description:
      "Developed and deployed a full-stack AI agent capable of querying databases using natural language. Built using Next.js 16 with API Routes for serverless backend, React frontend, and Vercel AI SDK integrated with OpenAI GPT models for tool-calling and SQL generation. Utilized Drizzle ORM with Turso (SQLite) and implemented a real-time chat interface using SSE for streaming AI responses.",
    type: "ai",
    technologies: [
      "Next.js 16",
      "React",
      "Tailwind CSS",
      "Vercel AI SDK",
      "OpenAI GPT",
      "Drizzle ORM",
      "SQLite",
      "Turso",
      "SSE",
      "TypeScript",
    ],
    image: "/project/sqlagentai.png",
    demoUrl: "https://sql-aiagent.vercel.app",
    codeUrl: "https://github.com/vanshmundhra9120/ai-learning/tree/main/agentic_frameworks/sql_agent",
  },

  
  // {
  //   title: "RAG-Powered News Chatbot",
  //   description:
  //     "Built an LLM-powered chatbot over 50+ news articles using a Retrieval-Augmented Generation (RAG) pipeline with Jina embeddings and Qdrant vector DB. Implemented session-based memory with Redis and REST/WebSocket APIs for real-time conversational flow. Designed an interactive React + SCSS UI with streaming bot replies and optimized chat performance.",
  //   type: "ai",
  //   technologies: [
  //     "Node.js",
  //     "React",
  //     "Redis",
  //     "Qdrant",
  //     "Gemini API",
  //     "Jina Embeddings",
  //   ],
  //   image: "/project/newschatbot.png",
  //   demoUrl: "https://newsy-ai-talk.vercel.app/",
  //   codeUrl: "https://github.com/vanshmundhra9120/news-chatbot-backend",
  // },
  
  
  
  // {
  //   title: "RAG-Chatbot",
  //   description:
  //     "A resume-aware chatbot using RAG, LLM function-calling, and LangChain that provides contextual responses.",
  //   type: "ai",
  //   technologies: [
  //     "Next.js",
  //     "LangChain",
  //     "AstraDB",
  //     "Gemini API",
  //     "TypeScript",
  //   ],
  //   image: "/project/chatbot.png",
  //   demoUrl: "https://chatbot.vanshmundhra.dev",
  //   codeUrl: "https://github.com/vanshmundhra9120/PersonalizedChatbot",
  // },
  // {
  //   title: "JobConnect Portal",
  //   description:
  //     "A full-stack job portal enabling recruiters and candidates to post, search, and apply for jobs with a real-time dashboard for analytics and notifications.",
  //   type: "fullstack",
  //   technologies: [
  //     "MongoDB",
  //     "Express.js",
  //     "React",
  //     "Node.js",
  //     "Redux",
  //     "JWT Authentication",
  //   ],
  //   image: "/project/jobportal.png",
  //   demoUrl: "https://talentbridge-1yxp.onrender.com/",
  //   codeUrl: "https://github.com/vanshmundhra9120/TalentBridge",
  // },
  // {
  //   title: "CricketChat Live",
  //   description:
  //     "A real-time chat application for cricket enthusiasts, featuring topic rooms, live scoring updates, and user profiles—built with MERN and Socket.io.",
  //   type: "fullstack",
  //   technologies: [
  //     "MongoDB",
  //     "Express.js",
  //     "React",
  //     "Node.js",
  //     "Socket.io",
  //     "WebSockets",
  //   ],
  //   image: "/project/cricket_chat.png",
  //   demoUrl: "https://cricket-chat-room-client.vercel.app",
  //   codeUrl: "https://github.com/vanshmundhra9120/cricket_chat_room_client",
  // },
  // {
  //   title: "Notes API Project",
  //   description:
  //     "Developed a RESTful Notes API with CRUD operations and JWT authentication, achieving a 99.9% uptime and supporting over 10,000 daily active users for efficient note management. Integrated a React frontend for user-friendly note creation and organization.",
  //   type: "fullstack",
  //   technologies: [
  //     "NestJS",
  //     "TypeScript",
  //     "React",
  //     "JWT",
  //     "PostgreSQL",
  //     "REST APIs",
  //   ],
  //   image:
  //     "/project/notes_api.png",
  //   demoUrl: "https://nestjs-two-tau.vercel.app",
  //   codeUrl: "https://github.com/vanshmundhra9120/nestjs/notes-api",
  // },
  
  // {
  //   title: "EmailGenie",
  //   description:
  //     "An AI-powered email template generator that creates personalized outreach messages based on user queries using LangChain and Gmail API.",
  //   type: "ai",
  //   technologies: ["Typescript", "LangChain", "Gmail API", "NextJs"],
  //   image: "./project/email.png",
  //   demoUrl: "https://email-generator-eta.vercel.app",
  //   codeUrl: "https://github.com/vanshmundhra9120/email-generator",
  // },

  // {
  //   title: "Splitmate",
  //   description:
  //     "Mobile expense tracking application with group expense management for 300+ users.",
  //   type: "fullstack",
  //   technologies: [
  //     "React Native",
  //     "Expo Router",
  //     "Firebase",
  //     "Zustand",
  //     "AsyncStorage",
  //   ],
  //   image:
  //     "https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   demoUrl: "https://www.youtube.com/watch?v=sVtEbq94MfM",
  //   codeUrl: "https://github.com/vanshmundhra9120/Splitmate",
  // },
  // {
  //   title: "Medialarm",
  //   description:
  //     "React Native medicine tracker with personalized medication reminders and biometric authentication.",
  //   type: "fullstack",
  //   technologies: [
  //     "React Native",
  //     "Expo",
  //     "TypeScript",
  //     "Async Storage",
  //     "Expo Notifications",
  //   ],
  //   image: "/project/medialarm.jpg",
  //   demoUrl: "#",
  //   codeUrl: "https://github.com/vanshmundhra9120/Medialarm",
  // },


  // {
  //   title: "CabRide",
  //   description:
  //     "Ride-hailing app with real-time location tracking via Google Maps API and secure authentication.",
  //   type: "fullstack",
  //   technologies: [
  //     "React Native",
  //     "TypeScript",
  //     "Clerk",
  //     "Zustand",
  //     "Google Maps API",
  //   ],
  //   image:
  //     "https://images.pexels.com/photos/1797542/pexels-photo-1797542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   demoUrl: "",
  //   codeUrl: "https://github.com/CabRide",
  // },
  
];
