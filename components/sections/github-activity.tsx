"use client";

import React, { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import SectionContainer from '@/components/section-container';
import { motion } from 'framer-motion';
import { githubConfig } from '@/data/github';
import { Github, Star, GitFork, BookOpen, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GithubData {
    stats: {
        totalCommits: number;
        totalForks: number;
        totalStars: number;
        totalRepos: number;
        contributionDays: number;
        currentStreak: number;
        totalContributions: number;
    };
    contributions: Array<{
        date: string;
        count: number;
        level: number;
    }>;
    userData: {
        name: string;
        bio: string;
        followers: number;
        following: number;
        avatar: string;
    };
}

export default function GithubActivity() {
    const [data, setData] = useState<GithubData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/github-stats');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    if (loading) {
        return (
            <SectionContainer id="activity" className="py-20">
                <Skeleton className="h-10 w-48 mb-8" />
                <Skeleton className="h-[200px] w-full rounded-xl" />
            </SectionContainer>
        );
    }

    if (!data) return null;

    // Filter for current year contributions if requested to "show this year first"
    // However, ActivityCalendar usually shows a full year block. 
    // We'll ensure the data passed is consistent.

    return (
        <SectionContainer id="activity" className="py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-12"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">GitHub Activity</h2>
                        <p className="text-muted-foreground">
                            Open source contributions and repository metrics
                        </p>
                    </div>
                    <a
                        href={`https://github.com/${githubConfig.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        <Github className="w-5 h-5" />
                        @{githubConfig.username}
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        icon={<Activity className="w-5 h-5 text-green-500" />}
                        label="Contributions"
                        value={data.stats.totalContributions.toLocaleString()}
                    />
                    <StatCard
                        icon={<Star className="w-5 h-5 text-yellow-500" />}
                        label="Total Stars"
                        value={data.stats.totalStars.toLocaleString()}
                    />
                    <StatCard
                        icon={<GitFork className="w-5 h-5 text-blue-500" />}
                        label="Total Forks"
                        value={data.stats.totalForks.toString()}
                    />
                    <StatCard
                        icon={<BookOpen className="w-5 h-5 text-purple-500" />}
                        label="Repositories"
                        value={data.stats.totalRepos.toString()}
                    />
                </div>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                    <CardContent className="p-6 md:p-8 flex flex-col items-center">
                        <div className="w-full overflow-x-auto">
                            <ActivityCalendar
                                data={data.contributions}
                                theme={githubConfig.theme}
                                labels={{
                                    totalCount: githubConfig.totalCountLabel.replace('{{count}}', data.stats.totalContributions.toString()),
                                }}
                                fontSize={14}
                                blockSize={12}
                                blockMargin={4}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </SectionContainer>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                {icon}
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</div>
            </CardContent>
        </Card>
    );
}
