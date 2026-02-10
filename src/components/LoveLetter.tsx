import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Blossom Component
const Blossom = ({ delay }: { delay: number }) => {
    // Randomize initial position and drift
    const randomX = Math.random() * 400 - 200; // -200 to 200
    const randomY = Math.random() * 400 - 200; // -200 to 200
    const randomRotate = Math.random() * 360;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: randomX,
                y: randomY,
                rotate: randomRotate + 180,
            }}
            transition={{
                duration: 2,
                ease: "easeOut",
                delay: delay,
            }}
            className="absolute top-1/2 left-1/2 w-6 h-6 pointer-events-none z-50"
        >
            <svg viewBox="0 0 24 24" fill="#fda4af" className="w-full h-full drop-shadow-sm">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </motion.div>
    );
};

export const LoveLetter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Create an array for blossoms
    const blossoms = Array.from({ length: 30 }); // 30 petals

    return (
        <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Blossom Explosion */}
            {isOpen && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {blossoms.map((_, i) => (
                        <Blossom key={i} delay={Math.random() * 0.5} />
                    ))}
                </div>
            )}

            <div className="max-w-2xl w-full relative z-10">
                {!isOpen ? (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full aspect-[3/2] bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-xl flex flex-col items-center justify-center group cursor-pointer transition-all hover:bg-white/60"
                    >
                        <Heart className="w-16 h-16 text-rose-400 mb-4 animate-pulse" fill="currentColor" />
                        <span className="font-display text-3xl text-gray-800">Read My Heart</span>
                        <span className="font-body text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Tap to open</span>
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white relative"
                    >
                        {/* Paper Texture Effect */}
                        <div className="absolute inset-0 bg-noise opacity-5 rounded-2xl pointer-events-none" />

                        <h2 className="font-display text-4xl text-rose-500 mb-6 text-center">My Dearest Sithu</h2>

                        <div className="space-y-4 font-body text-lg leading-relaxed text-gray-700">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                I wanted to present you with something special this time. I know this is a different approach—a digital space just for us—but I wanted to find a unique way to preserve our Valentine’s memories.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                It has been almost four years of this journey together. It hasn’t been a simple walk in the park; it has been a true adventure. We have faced so many difficult situations in our own personal lives, but the beauty of it all is that we never faced them alone. We stood by each other, solving every problem together.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                            >
                                From the moment we first met until today, we have traveled miles in our hearts. The journey is still ongoing, and I am so happy to be on this ride with you. We have shared so many beautiful memories, and yes, we have fought so many times. But through it all, we loved each other deeply. That love is what makes our life so beautiful.
                            </motion.p>
                        </div>

                        <div className="mt-12 text-center">
                            <span className="font-display text-3xl text-gray-800">Forever Yours,</span>
                            <br />
                            <span className="font-display text-2xl text-rose-500">Aashii</span>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
