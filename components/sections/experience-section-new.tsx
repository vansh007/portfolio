"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/fade-in";
import { experiences } from "@/data/experiences";
import {
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Calendar,
    Award,
    Code,
} from "lucide-react";

import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";
import { Badge } from "../ui/badge";
import { techIcons } from "@/lib/tech-icons";

const ExperienceSection = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <SectionContainer id="experience">
            <SectionHeader
                label="Experience"
                title="Professional Journey"
                description="My work background in software engineering, AI, and full-stack development."
            />

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="border border-border/40 rounded-xl overflow-hidden hover:border-primary/20 transition-all duration-300 bg-card shadow-sm">
                        {/* Header */}
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => toggleExpanded(exp.id)}
                        >
                            {/* Left side */}
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
                                    <img
                                        src={exp.logo}
                                        alt={exp.company}
                                        className="w-10 h-10 rounded-lg object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                        {exp.company}
                                        {exp.link && (
                                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(exp.link, "_blank");
                                            }} />
                                        )}
                                    </h3>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {exp.role}
                                    </p>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center justify-between md:flex-col md:items-end gap-1">
                                <p className="text-xs font-semibold text-muted-foreground/60 flex items-center gap-1.5 order-2 md:order-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {exp.duration}
                                </p>
                                <div className="order-1 md:order-2">
                                    {expandedItems.includes(exp.id) ? (
                                        <ChevronUp className="w-4 h-4 text-primary" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Expanded content */}
                        {expandedItems.includes(exp.id) && (
                            <div className="px-4 pb-5 border-t border-border/10 bg-muted/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="pt-4 space-y-4">
                                    {/* Achievements */}
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4 text-primary/60" />
                                                <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">
                                                    Achievements
                                                </h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm text-muted-foreground pl-6 relative leading-relaxed"
                                                    >
                                                        <span className="absolute left-1.5 top-2 w-1.5 h-1.5 bg-primary/30 rounded-full"></span>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Code className="w-4 h-4 text-primary/60" />
                                                <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">
                                                    Tech Stack
                                                </h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, idx) => {
                                                    const Icon = techIcons[tech];
                                                    return (
                                                        <Badge
                                                            key={idx}
                                                            variant="secondary"
                                                            className="text-[10px] px-2 py-0.5 font-medium bg-primary/5 text-primary border-primary/10 flex items-center gap-1.5"
                                                        >
                                                            {Icon && <Icon className="w-3 h-3" />}
                                                            {tech}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ExperienceSection;
