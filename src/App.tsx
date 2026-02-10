import { useRef, useState, Suspense } from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { LoveLetter } from './components/LoveLetter';
import { ReactLenis } from 'lenis/react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';

import { AudioManager } from './components/AudioManager';
import { ReasonsDeck } from './components/ReasonsDeck';

function App() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMuted(false);
  };

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#fff0f3] selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">

        {/* 3D Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 30 }}
            dpr={[1, 2]} // Limit pixel ratio for mobile performance
            gl={{ antialias: true }} // Enable default antialias (Post-processing disabled on mobile)
            performance={{ min: 0.5 }} // Allow downgrading quality
          >
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>
        </div>

        {/* Soft Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <AudioManager isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />

        {/* Hero Section */}
        <div className="relative z-10">
          <Hero onStart={scrollToTimeline} />
        </div>

        {/* Main Content */}
        <div ref={timelineRef} className="relative z-10 space-y-24 pb-24">
          <Timeline />
          <ReasonsDeck />
          <LoveLetter />
        </div>

        <footer className="relative z-10 py-8 text-center text-rose-300 font-body text-sm">
          Made with ❤️ for you
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
