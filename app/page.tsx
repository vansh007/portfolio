import HeroSection from "@/components/sections/hero-section";

import ProjectsSection from "@/components/sections/projects-section";
import ExperienceSection from "@/components/sections/experience-section-new";
import LearningSection from "@/components/sections/learning-section";
import FeaturedBlogs from "@/components/sections/featured-blogs";
import FloatingNav from "@/components/floating-nav";
import { getAllPosts } from "@/lib/blog";
import VisitorCounter from "@/components/visitor-counter";

export default function Home() {
  const posts = getAllPosts();


  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <FeaturedBlogs posts={posts} />
      <LearningSection />

      <FloatingNav />
    </main>
  );
}
