import React from 'react';

const Section: React.FC<{
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
}> = ({ children, align = 'center' }) => {
    return (
        <div
            className={`h-screen w-full flex items-center p-10 ${align === 'left'
                ? 'justify-start'
                : align === 'right'
                    ? 'justify-end'
                    : 'justify-center'
                }`}
        >
            <div className="max-w-lg">
                {children}
            </div>
        </div>
    );
};

export const StoryOverlay: React.FC = () => {
    return (
        <div className="w-full text-gray-800 antialiased font-display">

            {/* Section 1: Hero (Handled by main Hero component, so we keep this mostly transparent/empty) */}
            <Section>
                <div /> {/* Placeholder for scroll space */}
            </Section>

            {/* Section 2: Our Journey */}
            <Section align="right">
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40">
                    <h2 className="text-4xl text-rose-500 mb-4 opacity-100">Our Journey</h2>
                    <p className="text-xl text-gray-700 leading-relaxed font-body">
                        It started with a simple hello, but it turned into the most beautiful story I know.
                        Every moment since then has been a page I never want to turn.
                    </p>
                </div>
            </Section>

            {/* Section 3: Unforgettable Moments */}
            <Section align="left">
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40">
                    <h2 className="text-4xl text-rose-500 mb-4">Unforgettable</h2>
                    <p className="text-xl text-gray-700 leading-relaxed font-body">
                        The way you laugh, the way you listen, the way you make the world brighter just by being in it.
                        These are the things I cherish most.
                    </p>
                </div>
            </Section>

            {/* Section 4: Final Question */}
            <Section align="center">
                <div className="bg-white/80 backdrop-blur-xl p-10 rounded-full shadow-2xl border-2 border-rose-200 text-center">
                    <h1 className="text-5xl md:text-7xl text-rose-600 mb-6 font-bold">
                        Will you be my Valentine?
                    </h1>
                    <button className="bg-rose-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-300 hover:scale-105 active:scale-95">
                        Yes, Forever ❤️
                    </button>
                </div>
            </Section>

        </div>
    );
};
