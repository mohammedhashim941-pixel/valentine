import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeroProps {
    onStart: () => void;
    name?: string;
}

export const Hero: React.FC<HeroProps> = ({ onStart, name = "My Love" }) => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-quartz/20 to-serenity/20 z-0" />

            {/* Cinematic Text Reveal */}
            <div className="z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-4"
                >
                    <span className="font-display text-2xl md:text-3xl text-rose-500 tracking-widest uppercase">
                        For
                    </span>
                </motion.div>

                <div className="flex justify-center overflow-visible mb-8">
                    <motion.div
                        className="flex space-x-2 md:space-x-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.8
                                }
                            }
                        }}
                    >
                        {Array.from(name).map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { y: 100, opacity: 0, rotate: 10 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        rotate: 0,
                                        transition: {
                                            type: "spring",
                                            damping: 12,
                                            stiffness: 100
                                        }
                                    }
                                }}
                                className="font-display text-6xl md:text-8xl lg:text-9xl text-gray-800 drop-shadow-sm inline-block py-2"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="font-body text-gray-600 text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-12"
                >
                    Come take a walk down memory lane with me...
                </motion.p>

                <motion.button
                    onClick={onStart}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-lg hover:bg-white/60 transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-quartz/30 to-serenity/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative font-body text-gray-800 tracking-wider flex items-center gap-2">
                        Start the Journey <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                    </span>
                </motion.button>
            </div>

            {/* Floating Elements (Subtle) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 opacity-30 pointer-events-none"
            >
                <Heart className="w-24 h-24 text-rose-200" fill="currentColor" />
            </motion.div>
        </section>
    );
};
