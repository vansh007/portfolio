"use client";

import { Calendar, Clock, ArrowRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/ui/content-card";
import Link from "next/link";
import { ViewCounter } from "@/components/view-counter";

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
    featured?: boolean;
    readTime?: string;
}

interface BlogCardProps {
    post: BlogPost;
    index?: number;
    showFeaturedBadge?: boolean;
    className?: string;
}

// Helper function to get blog image path
const getBlogImagePath = (slug: string): string => {
    // We prioritize hero.png in the blog's specific folder
    // This allows us to avoid hardcoding every new post
    return `/blog/${slug}/hero.png`;
};

export default function BlogCard({
    post,
    index = 0,
    showFeaturedBadge = false,
    className = ""
}: BlogCardProps) {
    const footer = (
        <div className="flex items-center justify-between w-full gap-4 flex-wrap gap-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
                {post.readTime && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">{post.readTime}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3">
                <ViewCounter slug={post.slug} />
                <Link href={`/blog/${post.slug}`}><ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /></Link>
            </div>
        </div>
    );

    const badges = showFeaturedBadge && post.featured ? (
        <Badge className="bg-primary text-primary-foreground">
            Featured
        </Badge>
    ) : null;

    return (
        <ContentCard
            title={post.title}
            description={post.description}
            image={getBlogImagePath(post.slug)}
            href={`/blog/${post.slug}`}
            tags={post.tags}
            badges={badges}
            footer={footer}
            index={index}
            className={className}
        />
    );
}