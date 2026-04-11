
"use client"
import { useEffect, useState, useRef } from "react";
import { Eye } from "lucide-react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function VisitorCounter() {
    const [views, setViews] = useState<number | null>(null);
    const initialized = useRef(false);

    // Motion values for count-up animation
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        async function updateViews() {
            try {
                const hasVisited = localStorage.getItem("visitor_counted");

                if (!hasVisited) {
                    // First increment
                    const res = await fetch("/api/visitors", {
                        method: "POST",
                    });
                    const data = await res.json();
                    if (data.views) {
                        setViews(data.views);
                        localStorage.setItem("visitor_counted", "true");

                        const animationDuration = 2000;
                        const fps = 60;
                        const steps = animationDuration / (1000 / fps);

                        count.set(data.views);
                    }
                } else {
                    // Just fetch current views
                    const getRes = await fetch("/api/visitors");
                    const getData = await getRes.json();
                    if (getData.views) {
                        setViews(getData.views);
                        count.set(getData.views);
                    }
                }
            } catch (error) {
                console.error("Failed to update visitor count", error);

                // Fallback to getting current views if post fails
                try {
                    const getRes = await fetch("/api/visitors");
                    if (!getRes.ok) throw new Error(`Status: ${getRes.status}`);
                    const getData = await getRes.json();
                    if (getData.views) {
                        setViews(getData.views);
                        count.set(getData.views);
                    }
                } catch (e) {
                    // Set error state to visible - for debugging
                    console.error("Final fallback failed", e);
                    setViews(-1); // Use -1 to indicate error
                }
            }
        }

        updateViews();
    }, [count]);

    // Use spring for smooth counting animation
    const displayCount = useSpring(count, {
        stiffness: 50,
        damping: 20,
        mass: 1,
    });


    function CounterNumber({ value }: { value: typeof displayCount }) {
        const [displayValue, setDisplayValue] = useState(0);

        useEffect(() => {
            return value.on("change", (latest) => {
                setDisplayValue(Math.round(latest));
            });
        }, [value]);

        return <span>{displayValue.toLocaleString()}</span>;
    }

    if (views === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-bold tracking-tight text-primary/80"
        >
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${views === -1 ? 'bg-red-500' : 'bg-primary'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${views === -1 ? 'bg-red-500' : 'bg-primary'}`}></span>
            </span>
            <span className="uppercase tracking-[0.1em]">
                Unique Visitors: <span className={`${views === -1 ? 'text-red-500' : 'text-primary'} ml-1`}>
                    {views === -1 ? "Error" : <CounterNumber value={displayCount} />}
                </span>
            </span>
        </motion.div>
    );
}
