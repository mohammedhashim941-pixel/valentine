import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

const REASONS = [
    "Your smile lights up my darkest days.",
    "The way you laugh at my silly jokes.",
    "How you make even the mundane feel magical.",
    "Your kindness towards everyone you meet.",
    "The comfort I feel just being near you.",
    "How you push me to be a better person.",
    "The way your eyes sparkle when you're excited.",
    "Your unwavering support for my dreams.",
    "The warmth of your hugs.",
    "Just being you."
];

export const ReasonsDeck: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextCard = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % REASONS.length);
    };

    const prevCard = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
    };

    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotate: direction > 0 ? 20 : -20
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotate: direction < 0 ? 20 : -20,
            transition: {
                duration: 0.5
            }
        })
    };

    return (
        <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="font-display text-4xl text-rose-500 mb-12 text-center">Reasons Why I Love You</h2>

            <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                nextCard();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevCard();
                            }
                        }}
                        className="absolute w-full h-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-8 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing"
                    >
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-white/50 rounded-2xl pointer-events-none" />
                        <Heart className="w-12 h-12 text-rose-300 mb-6 relative z-10" fill="currentColor" />

                        <p className="font-display text-3xl md:text-4xl text-gray-800 leading-tight relative z-10">
                            {REASONS[index]}
                        </p>

                        <div className="absolute bottom-6 text-sm font-body text-gray-400">
                            {index + 1} / {REASONS.length}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons for non-touch */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={prevCard}
                    className="p-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors backdrop-blur-sm shadow-sm text-gray-700"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextCard}
                    className="p-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors backdrop-blur-sm shadow-sm text-gray-700"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <p className="mt-4 text-sm text-gray-400 font-body animate-pulse">Swipe or click to see more</p>
        </section>
    );
};

// Helpers for swipe detection
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};
