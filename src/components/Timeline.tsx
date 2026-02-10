import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MemoryCard } from './MemoryCard';

const MEMORIES = [
    {
        date: "First Met",
        title: "The Beginning",
        description: "I was just smiling thinking about when we met up after Christmas break. I’ll never forget that challenge we made on WhatsApp right before seeing each other.",
        image: "/first-meet.jpg"
    },
    {
        date: "First Date",
        title: "Coffee & Nervous Laughs",
        description: "That first date holds such a special place in my heart. Between the meal we shared and the way we laughed together, it stands out as one of the most beautiful moments of our story.",
        image: "/first-date.jpg"
    },
    {
        date: "First Trip",
        title: "Adventures Together",
        description: "Our first trip wasn't a long journey in miles, but we traveled through so many emotions together. We fought, we laughed, and we truly lived in those moments. That trip taught me a beautiful lesson: it’s never about the destination or the place; it is entirely about who you are traveling with.",
        image: "/first-trip.jpg"
    },
    {
        date: "Today",
        title: "Still Falling",
        description: "Even though we are miles apart right now, we are still navigating life’s challenges together. We’ve fought, we’ve complained, and we’ve faced so many hard situations—but we never gave up on each other. We chose to stay, to support one another, and that commitment is what makes our life so incredibly beautiful.",
        image: "/now.jpg"
    }
];

export const Timeline: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative py-20 px-4 md:px-0 max-w-6xl mx-auto">
            {/* Central Timeline Line (Desktop Animated) */}
            <motion.div
                className="absolute left-[50%] top-0 w-1 h-full bg-rose-quartz/30 -translate-x-1/2 rounded-full hidden md:block"
                style={{ scaleY, originY: 0 }}
            />

            <div className="relative z-10">
                {MEMORIES.map((memory, index) => (
                    <MemoryCard key={index} index={index} {...memory} />
                ))}
            </div>
        </div>
    );
};
