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
  const [activeTab, setActiveTab] = useState("ai");
  const router = useRouter();

  const filteredProjects = projects.filter((project) => project.type === activeTab);

  // Featured projects (first 6)
  const featuredProjects = filteredProjects.slice(0, 6);

  return (
    <SectionContainer id="projects">
      {/* Projects Header */}
      <SectionHeader
        label="Projects"
        title="Recent Work"
        description="A showcase of full-stack applications, AI experiments, and system architectures built with modern technologies."
      />

      {/* Category Tabs */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="mb-6 flex flex-wrap h-auto p-1 bg-muted/30 gap-1 border border-border/50 rounded-lg">
          <TabsTrigger
            value="fullstack"
            className="flex-1 text-xs py-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
          >
            Engineering
          </TabsTrigger>

          <TabsTrigger
            value="ai"
            className="flex-1 text-xs py-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
          >
            AI/ML
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map(
              (project, index) => {
                const footer = (
                  <div className="flex gap-3 w-full">
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        className="flex-1"
                        target="_blank"
                      >
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
                      <Link
                        href={project.codeUrl}
                        className="flex-1"
                        target="_blank"
                      >
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
                      ? "Engine"
                      : project.type === "mobile"
                        ? "Mobile"
                        : "AI"}
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
              }
            )}
          </div>

          {/* View More Button */}
          {filteredProjects.length > 6 && (
            <div className="flex justify-center mt-12">
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 font-semibold px-8 border-border/50 hover:bg-muted/50 transition-all"
                >
                  View More Projects
                  <Layers className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </SectionContainer>
  );
}
