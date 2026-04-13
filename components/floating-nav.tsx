"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Rss, MessageCircle, FileText, Trophy, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { profileData } from "@/data/profile";

interface SocialLink {
    icon: LucideIcon;
    href: string;
    label: string;
};

export default function FloatingNav() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 250) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const socialLinks: SocialLink[] = [
        {
            icon: FileText,
            href: profileData.resume || "#",
            label: "Resume",

        },
        {
            icon: Github,
            href: "https://github.com/vansh007",
            label: "GitHub",

        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/vanshmundhra",
            label: "LinkedIn",

        },
        {
            icon: Twitter,
            href: "https://twitter.com/VanshOnChain",
            label: "Twitter",

        },
        {
            icon: MessageCircle,
            href: "#",
            label: "Medium"
        },
        {
            icon: Mail,
            href: "mailto:vanshmundhra10may@gmail.com",
            label: "Email"
        },
        {
            icon: Trophy,
            href: "/life",
            label: "Life"
        },
        {
            icon: Rss,
            href: "/blog",
            label: "RSS"
        }
    ];

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-18 left-1/2 transform -translate-x-1/2 z-50"
        >
            <div className="bg-background/80 backdrop-blur-lg border border-slate-200/20 rounded-full px-6 py-3 shadow-lg shadow-slate-200/10">
                <div className="flex items-center gap-2">
                    {socialLinks.map((link, index) => (
                        <motion.div
                            key={link.label}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:bg-slate-200/10 hover:text-slate-600 transition-all duration-300"
                                    aria-label={link.label}
                                >
                                    <link.icon className="h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
