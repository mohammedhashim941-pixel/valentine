import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioManagerProps {
    isMuted: boolean;
    onToggleMute: () => void;
}

export const AudioManager: React.FC<AudioManagerProps> = ({ isMuted, onToggleMute }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt auto-play on mount if not muted, but browsers usually block until interaction
        if (audioRef.current) {
            audioRef.current.volume = 0.4; // Soft volume
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (!isMuted) {
                audioRef.current.play().catch(() => {
                    // Autoplay blocked - will wait for interaction
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMuted]);

    // Listen for first interaction to unlock audio
    useEffect(() => {
        const unlockAudio = () => {
            if (audioRef.current && !isMuted) {
                audioRef.current.play();
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('scroll', unlockAudio);
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('scroll', unlockAudio);

        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('scroll', unlockAudio);
        };
    }, [isMuted]);

    return (
        <>
            <audio
                ref={audioRef}
                loop
                src={`${import.meta.env.BASE_URL}song.mp3`}
            />

            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={onToggleMute}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full shadow-lg hover:bg-white/20 transition-all border border-white/20 group"
                >
                    {/* Visualizer bars (static for now) */}
                    <div className="absolute inset-0 rounded-full border border-rose-200/30 animate-pulse" />

                    {!isMuted ? (
                        <Volume2 className="w-5 h-5 text-rose-100 group-hover:text-rose-200" />
                    ) : (
                        <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>
        </>
    );
};
