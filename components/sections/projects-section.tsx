"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, Github, Layers } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/data";
import { motion } from "framer-motion";
import { ContentCard } from "@/components/ui/content-card";


import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";
import { techIcons } from "@/lib/tech-icons";

export default function ProjectsSection() {
  const router = useRouter();


  return (
    <SectionContainer id="projects">
      {/* Projects Header */}
      <SectionHeader
        label="Projects"
        title="Recent Work"
        description="A showcase of full-stack applications, AI experiments, and system architectures built with modern technologies."
      />

      {/* Consolidated Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.slice(0, 6).map((project, index) => {
          const footer = (
            <div className="flex gap-3 w-full">
              {project.demoUrl && (
                <Link href={project.demoUrl} className="flex-1" target="_blank">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-2 text-xs h-9 bg-primary hover:bg-primary/90 transition-all font-medium"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </Button>
                </Link>
              )}
              {project.codeUrl && (
                <Link href={project.codeUrl} className="flex-1" target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-xs h-9 border-border/50 hover:bg-muted/50 transition-all font-medium"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </Button>
                </Link>
              )}
            </div>
          );

          const badges = (
            <Badge
              variant="outline"
              className="text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary border-primary/20 px-2 py-0.5 rounded-full"
            >
              {project.type === "fullstack"
                ? "Engineering"
                : project.type === "mobile"
                ? "Mobile"
                : "AI/ML"}
            </Badge>
          );

          return (
            <ContentCard
              key={`${project.title}-${index}`}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.technologies}
              tagIcons={techIcons}
              badges={badges}
              footer={footer}
              index={index}
              enableEntryAnimation={false}
            />
          );
        })}
      </div>

      {/* View More Button */}
      {projects.length > 6 && (
        <div className="flex justify-center mt-12">
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 font-semibold px-8 border-border/50 hover:bg-muted/50 transition-all"
            >
              View All Projects
              <Layers className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </SectionContainer>
  );
}
