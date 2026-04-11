export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "1",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Go", "Rust", "SQL"]
  },
  {
    id: "2",
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Shadcn", "React Native", "Expo", "Redux", "Zustand", "React Query", "Framer Motion"]
  },
  {
    id: "3",
    title: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "NestJS", "Gin", "Socket", "Supabase", "PSQL", "Prisma", "MongoDB", "GraphQL"]
  },
  {
    id: "4",
    title: "AI/ML",
    skills: ["LangChain", "Langgraph", "OpenAI", "Streamlit", "PyTorch", "HuggingFace Transformers"]
  },
  {
    id: "5",
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "Vercel", "Kubernetes", "Linux", "CloudFlare"]
  },
  {
    id: "7",
    title: "Blockchain / Web3",
    skills: ["Solana", "Anchor", "Smart Contracts", "Web3.js", "Rust", "Solana Wallet Adapter"]
  },


  {
    id: "6",
    title: "Tools",
    skills: ["Git", "gRPC", "GraphQL", "REST APIs", "Cursor"]
  }
];
