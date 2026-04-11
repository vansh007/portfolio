"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
    slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
    const [views, setViews] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!slug) return;

        const trackView = async () => {
            try {
                // Determine if we should increment or just fetch
                const storageKey = `viewed_post_${slug}`;
                const hasViewed = localStorage.getItem(storageKey);

                if (!hasViewed) {
                    const res = await fetch("/api/blog-views", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ slug }),
                    });

                    if (!res.ok) throw new Error("Failed to track view");

                    const data = await res.json();
                    setViews(data.views);
                    localStorage.setItem(storageKey, "true");
                } else {
                    // Just fetch
                    const getRes = await fetch(`/api/blog-views?slug=${slug}`);
                    if (getRes.ok) {
                        const data = await getRes.json();
                        setViews(data.views);
                    }
                }
            } catch (err) {
                console.error("Error in ViewCounter:", err);
                setError(true);
            }
        };

        trackView();
    }, [slug]);

    if (error) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>-- views</span>
            </div>
        );
    }

    if (views === null) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                <Eye className="w-4 h-4" />
                <span>...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground" title="Total views">
            <Eye className="w-4 h-4" />
            <span>{views.toLocaleString()} views</span>
        </div>
    );
}
