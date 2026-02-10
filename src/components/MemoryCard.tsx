import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

interface MemoryCardProps {
    date: string;
    title: string;
    description: string;
    image: string;
    index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ date, title, description, image, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className={cn(
                "relative flex flex-col md:flex-row items-center gap-8 mb-32",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Date Connector (Mobile & Desktop) */}
            <div className="absolute left-4 md:left-[50%] top-0 w-px h-full bg-rose-quartz/50 -translate-x-[50%] z-0 block" />

            {/* Date Marker */}
            <div className="absolute left-4 md:left-[50%] top-0 -translate-x-[50%] z-10 flex items-center justify-center w-8 h-8 rounded-full bg-rose-quartz ring-4 ring-white">
                <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            <div className="pl-12 md:pl-0 w-full flex flex-col md:flex-row items-center gap-8">
                {/* Image Side */}
                <div className="w-full md:w-[45%] group overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] relative">
                    <motion.img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-[20s] ease-linear scale-100 group-hover:scale-110"
                        animate={{ scale: [1, 1.15] }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>

                {/* Text Side */}
                <div className="w-full md:w-[45%] flex flex-col justify-center text-center md:text-left p-6 glass-card backdrop-blur-xl border-white/20">
                    <span className="font-display text-rose-500 text-2xl mb-2">{date}</span>
                    <h3 className="font-body text-3xl font-bold text-gray-800 mb-4">{title}</h3>
                    <p className="font-body text-gray-600 leading-relaxed text-lg">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
