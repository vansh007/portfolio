import { Metadata } from 'next';
import FadeIn from '@/components/animations/fade-in';
import { getAllPosts } from '@/lib/mdx';
import BlogCard from '@/components/blog-card';

export const metadata: Metadata = {
    title: 'Blog | Vansh Mundhra - Technical Articles & Project Deep Dives',
    description:
        'In-depth technical articles about microservices, AI/ML, and software architecture, New Technology and Intersection of Psychology and Science',
};

export default async function BlogPage() {
    const allPosts = await getAllPosts();
    const blogPosts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="min-h-screen pt-4 pb-6">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-20">
                <FadeIn>
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Vansh's Blog
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Technical articles about New Technologies, AI/ML, and software architecture, and Intersection of Psychology and Science
                        </p>
                    </div>
                </FadeIn>

                {blogPosts.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold mb-3 text-muted-foreground">
                            No Blog Posts Yet
                        </h3>
                        <p className="text-muted-foreground">
                            Blog posts will appear here once they are added.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                index={index}
                                showFeaturedBadge={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
