export interface Experience {
  id: string;
  company: string;
  link?: string;
  role: string;
  type: "fulltime" | "intern" | "contract";
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Reclaim Protocol",
    link: "https://reclaimprotocol.org/",
    role: "Testing Intern",
    type: "intern",
    duration: "december 2025 - present",
    startDate: "2025-12",
    endDate: "present",
    description:
    "Testing-focused internship involving validation of student identity verification workflows for institutional deployment.",
    achievements: [
      "Tested the student verification flow for college-level deployment, ensuring correctness of identity and eligibility checks",
      "Validated end-to-end verification scenarios, including successful, failed, and edge-case flows",
      "Identified and reported issues related to verification logic and user experience during testing",
      "Collaborated with the team to confirm fixes and ensure stable verification before rollout",
    ],
    technologies: [
      "Verification Workflows",
      "Software Testing",
      "Quality Assurance",
      "Identity Verification",
      "Web Applications"
    ],
    logo: "/company/reclaim.png",
  },
  {
    id: "2",
    company: "IIT Madras - Cystar Lab",
    link: "https://cystar.iitm.ac.in/",
    role: "Research Intern",
    type: "intern",
    duration: "december 2024 - july 2025",
    startDate: "2024-12",
    endDate: "2025-07",
    description:
      "Research internship focused on government digital infrastructure, distributed trust systems, and cryptographic mechanisms, with emphasis on policy-backed technology design and real-world deployment feasibility.",
    achievements: [
      "Conducted in-depth research on PM-KISAN and other Indian government digital schemes to analyze trust, transparency, and scalability challenges",
      "Studied and evaluated Zero-Knowledge Proofs (ZKPs) for privacy-preserving verification in public digital systems",
      "Researched distributed trust models and algorithmic frameworks for secure, decentralized governance infrastructure",
      "Authored and structured the complete research proposal that secured ICSSR funding worth ₹30 Lakhs",
      "Contributed to bridging policy requirements and technical design for secure and privacy-aware public systems",
    ],
    technologies: [
    "Zero-Knowledge Proofs",
    "Distributed Systems",
    "Cryptographic Algorithms",
    "Trust Models",
    "Research Methodology",
    "Policy-Oriented System Design"
  ],
    logo: "/company/cystar.png",
  },
  {
    id: "3",
    company: "Aurasoft Digitech",
    link: "https://aurasoftdigitech.com/",
    role: "Full Stack Intern",
    type: "intern",
    duration: "may 2024 - july 2024",
    startDate: "2024-05",
    endDate: "2025-07",
    description: "UI/UX revamp, 25% faster database reads",
    achievements: [
      "Revamped web UI/UX and improved form validation logic to reduce backend errors",
      "Designed MongoDB schemas with indexed caching, speeding up reads by 25%",
      "Built frontend features using React.js, aligning with business and accessibility goals",
      "Collaborated with cross-functional teams to deliver production-ready solutions",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Full Stack"],
    logo: "/company/aurasoft.png",
  },
];
