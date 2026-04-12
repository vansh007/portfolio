"use client";

import React from 'react';
import SectionContainer from '@/components/section-container';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Activity, Dumbbell, ArrowLeft, Heart, Camera, Map, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LifeBeyondCode() {
    const highlights = [
        {
            title: "Competitive Sports",
            description: "Deeply passionate about physical excellence and team dynamics. Whether on the field or in the gym, I value discipline and the constant pursuit of growth.",
            icon: <Trophy className="w-6 h-6 text-yellow-500" />,
            tag: "Active",
            bg: "from-yellow-500/10 to-transparent"
        },
        {
            title: "Fitness Engineering",
            description: "Applying an engineering mindset to human performance. I treat training as a system to be optimized through data and consistency.",
            icon: <Dumbbell className="w-6 h-6 text-blue-500" />,
            tag: "Daily",
            bg: "from-blue-500/10 to-transparent"
        },
        {
            title: "Exploring Horizons",
            description: "Finding inspiration in nature and new environments. Travel and exploration provide the mental reset needed for peak cognitive performance.",
            icon: <Map className="w-6 h-6 text-green-500" />,
            tag: "Discovery",
            bg: "from-green-500/10 to-transparent"
        },
        {
            title: "Visual Storytelling",
            description: "Capturing moments that tell a story beyond words. Photography is my way of preserving the beauty in the ordinary.",
            icon: <Camera className="w-6 h-6 text-purple-500" />,
            tag: "Creative",
            bg: "from-purple-500/10 to-transparent"
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <SectionContainer className="py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-16"
                >
                    {/* Header Section */}
                    <div className="space-y-6 max-w-3xl">
                        <Link href="/">
                            <Button variant="ghost" className="gap-2 group -ml-4 hover:bg-transparent">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Back to Portfolio</span>
                            </Button>
                        </Link>
                        
                        <div className="space-y-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
                            >
                                <Star className="w-3 h-3 fill-primary" />
                                Personal Journey
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                                Life Beyond <br /><span className="text-primary italic">Code</span>
                            </h1>
                        </div>
                        
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            I believe that excellence in one area fuels excellence in all others. 
                            My passions outside of software engineering define my character, 
                            build my resilience, and provide the balance needed to solve 
                            humanity&apos;s most complex digital challenges.
                        </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Card className="group relative bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden h-full">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <CardContent className="p-8 relative z-10 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="p-4 bg-background/80 rounded-2xl border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                {item.icon}
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-1 bg-muted rounded-md uppercase tracking-tighter text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer / Call to Action or More to come */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="relative p-12 rounded-[2.5rem] bg-card/30 backdrop-blur-md border border-border/50 text-center space-y-6 overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Heart className="w-10 h-10 text-red-500/80 mx-auto fill-red-500/20" />
                        </motion.div>
                        <div className="space-y-2 relative z-10">
                            <h2 className="text-3xl font-bold">More stories are brewing...</h2>
                            <p className="text-muted-foreground max-w-lg mx-auto italic text-lg">
                                &apos;I&apos;m currently curating highlights from my sports journey and personal adventures 
                                to share with you very soon.&apos;
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionContainer>
        </main>
    );
}
