"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import SectionContainer from "@/components/section-container";

import { techIcons } from "@/lib/tech-icons";
import { useState } from "react";
import VisitorCounter from "../visitor-counter";
import { PortfolioTimer } from "@/components/portfolio-timer";

// Enhanced tech stack
const techStack = [
  { name: "React", icon: techIcons["React"], category: "frontend", color: "#61DAFB" },
  { name: "Next.js", icon: techIcons["Next.js"], category: "frontend", color: "#000000" },
  { name: "TypeScript", icon: techIcons["TypeScript"], category: "frontend", color: "#3178C6" },
  { name: "JavaScript", icon: techIcons["JavaScript"], category: "frontend", color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: techIcons["Tailwind CSS"], category: "frontend", color: "#06B6D4" },

  // Backend
  { name: "Node.js", icon: techIcons["Node.js"], category: "backend", color: "#339933" },
  { name: "Express.js", icon: techIcons["Express.js"], category: "backend", color: "#141111" },
  { name: "Python", icon: techIcons["Python"], category: "backend", color: "#e9e338" },
  { name: "FastAPI", icon: techIcons["FastAPI"], category: "backend", color: "#009688" },
  { name: "Go", icon: techIcons["Go"], category: "backend", color: "#2d82c7" },
  { name: "NestJS", icon: techIcons["NestJS"], category: "backend", color: "#dc1308" },
  { name: "JWT", icon: techIcons["JWT"], category: "backend", color: "#f7f0f0" },
  { name: "GraphQL", icon: techIcons["GraphQL"], category: "backend", color: "#E10098" },
  { name: "gRPC", icon: techIcons["gRPC"], category: "backend", color: "#2786eb" },
  { name: "Socket.io", icon: techIcons["Socket.io"], category: "backend", color: "#010101" },

  // Databases
  { name: "MongoDB", icon: techIcons["MongoDB"], category: "database", color: "#47A248" },
  { name: "PostgreSQL", icon: techIcons["PostgreSQL"], category: "database", color: "#336791" },
  { name: "Supabase", icon: techIcons["Supabase"], category: "database", color: "#3ECF8E" },
  { name: "Firebase", icon: techIcons["Firebase"], category: "database", color: "#FFCA28" },

  // Mobile
  { name: "React Native", icon: techIcons["React Native"], category: "mobile", color: "#61DAFB" },
  { name: "Expo", icon: techIcons["Expo"], category: "mobile", color: "#000020" },

  // AI & ML
  { name: "OpenAI", icon: techIcons["OpenAI"], category: "ai", color: "#412991" },
  { name: "Hugging Face", icon: techIcons["Hugging Face"], category: "ai", color: "#FF9D00" },
  { name: "LangChain", icon: techIcons["LangChain"], category: "ai", color: "#1C3C3C" },
  { name: "NumPy", icon: techIcons["NumPy"], category: "ai", color: "#013243" },
  { name: "Pandas", icon: techIcons["Pandas"], category: "ai", color: "#150458" },
  { name: "Streamlit", icon: techIcons["Streamlit"], category: "ai", color: "#FF4B4B" },
  { name: "PyTorch", icon: techIcons["PyTorch"], category: "ai", color: "#EE4C2C" },
  { name: "Scikit-learn", icon: techIcons["Scikit-learn"], category: "ai", color: "#F7931E" },
  { name: "Transformers", icon: techIcons["Transformers"], category: "ai", color: "#FFD21E" },

  // DevOps
  { name: "Docker", icon: techIcons["Docker"], category: "devops", color: "#2496ED" },
  { name: "AWS", icon: techIcons["AWS"], category: "devops", color: "#FF9900" },
  { name: "Git", icon: techIcons["Git"], category: "devops", color: "#F05032" },
  { name: "Postman", icon: techIcons["Postman"], category: "devops", color: "#FF6C37" },
  { name: "Linux", icon: techIcons["Linux"], category: "devops", color: "#FCC624" },

  // Blockchain
  { name: "Solana", icon: techIcons["Solana"], category: "blockchain", color: "#9945FF" },
  { name: "Rust", icon: techIcons["Rust"], category: "server", color: "#000000" },
  { name: "Anchor", icon: techIcons["Anchor"], category: "blockchain", color: "#1D2331" },
];


function TechLogos() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="relative">
      <h3 className="text-xl font-semibold text-white mb-4">Technologies that I have used</h3>

      {/* Row 1 */}
      <div className="flex overflow-hidden mb-3">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" } }}
          className="flex gap-8 pr-8"
        >
          {[...techStack, ...techStack].map((tech, index) => {
            const IconComponent = tech.icon;
            if (!IconComponent) return null; // Guard against undefined icons
            return (
              <div key={`${tech.name}-${index}`} className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 whitespace-nowrap hover:bg-card/80 transition-all duration-300 group">
                <IconComponent className="text-lg group-hover:scale-110 transition-transform duration-300" style={{ color: tech.color }} />
                <span className="text-sm font-medium text-foreground/80">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2 */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [-2000, 0] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" } }}
          className="flex gap-8 pr-8"
        >
          {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, index) => {
            const IconComponent = tech.icon;
            if (!IconComponent) return null; // Guard against undefined icons
            return (
              <div key={`${tech.name}-reverse-${index}`} className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 whitespace-nowrap hover:bg-card/80 transition-all duration-300 group">
                <IconComponent className="text-lg group-hover:scale-110 transition-transform duration-300" style={{ color: tech.color }} />
                <span className="text-sm font-medium text-foreground/80">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}



export default function HeroSection() {
  const [animateImage, setAnimateImage] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };


  return (
    <SectionContainer className="pt-20 pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Avatar and Intro Header */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <motion.div
            variants={itemVariants}
            onClick={() => setAnimateImage(!animateImage)}
            className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 cursor-pointer"
          >
            <motion.div
              className="absolute -inset-2 bg-primary/10 rounded-full blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              animate={animateImage ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
              className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-background shadow-xl"
            >
              <Image
                src="/pixel-avatar.png"
                alt="Vansh Mundhra"
                fill
                className="object-cover scale-110"
                priority
              />
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
              Hi, I&apos;m vansh <span className="text-muted-foreground/50">—</span>
              <br />
              <span className="text-sidebar-primary italic">

                <Typewriter
                  words={["Product Builder", "Fullstack Engineer", "Software Engineer", "AI Engineer", "Web3 Developer"]}
                  loop={true}
                  cursor
                  cursorColor="text-blue-800"
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed max-w-lg">
              I build interactive, scalable web apps and AI agents. Enthusiastic about
              the future of <span className="text-foreground font-medium">Gen AI</span> and high-performance
              distributed systems.
            </motion.p>
          </div>
        </div>

        {/* Action Buttons & Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <VisitorCounter />
            <PortfolioTimer />
          </div>
          <Link href="/projects">
            <Button size="sm" variant="default" className="rounded-full px-5 font-semibold">
              View Work
            </Button>
          </Link>
          <a href="https://cal.com/vansh-mundhra" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="rounded-full px-5 font-semibold border-border/50">
              Book Call
            </Button>
          </a>
        </motion.div>
        <TechLogos />
      </motion.div>
    </SectionContainer>
  );
}
