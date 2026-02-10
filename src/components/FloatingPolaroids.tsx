import { Float, Image, useVideoTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';


interface MediaItem {
    type: 'image' | 'video';
    src: string;
}

const MEDIA: MediaItem[] = [
    { type: 'image', src: "/background image 1.jpg" },
    { type: 'video', src: "/Background video1.mp4" },
    { type: 'image', src: "/background image 2.jpg" },
    { type: 'video', src: "/background video 2.mp4" },
    { type: 'image', src: "/background image 3.jpg" },
    { type: 'video', src: "/background video 3.mp4" }
];

const VideoPlane = ({ src, scale, opacity }: { src: string, scale: number, opacity: number }) => {
    const texture = useVideoTexture(src);
    return (
        <mesh scale={[scale, scale, 1]}>
            <planeGeometry />
            <meshBasicMaterial map={texture} transparent opacity={opacity} toneMapped={false} />
        </mesh>
    );
};

export const FloatingPolaroids = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;

    const polaroids = useMemo(() => {
        return MEDIA.map((item) => {
            // Random positions spread out in the scene
            // Reduced spread to bring them closer to center as requested
            const x = (Math.random() - 0.5) * (isMobile ? 4 : 8); // Was 6 : 14
            const y = (Math.random() - 0.5) * (isMobile ? 7 : 6); // Was 10 : 8
            const z = -2 - Math.random() * 3; // Was * 5 - brought slightly closer depth-wise
            const rotation = [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5];
            const scale = isMobile ? 1.5 : 2;

            return { ...item, position: [x, y, z] as [number, number, number], rotation: rotation as [number, number, number], scale };
        });
    }, [isMobile]);

    return (
        <group>
            {polaroids.map((data, i) => (
                <Float
                    key={i}
                    speed={1.5} // Animation speed
                    rotationIntensity={0.5} // XYZ rotation intensity
                    floatIntensity={1} // Up/down float intensity
                    floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within
                >
                    <group position={data.position} rotation={data.rotation}>
                        {/* Polaroid Frame */}
                        <mesh position={[0, 0, -0.01]}>
                            <planeGeometry args={[data.scale * 1.1, data.scale * 1.3]} />
                            <meshBasicMaterial color="#ffffff" />
                        </mesh>

                        {/* Content */}
                        {data.type === 'video' ? (
                            <VideoPlane src={data.src} scale={data.scale} opacity={0.8} />
                        ) : (
                            <Image url={data.src} transparent opacity={0.8} scale={[data.scale, data.scale]} />
                        )}
                    </group>
                </Float>
            ))}
        </group>
    );
};
