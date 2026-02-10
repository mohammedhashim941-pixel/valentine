import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SakuraParticles = ({ count = 100 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Create dummy object for matrix calculations (re-use to avoid GC)
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random initial positions and properties
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -20 + Math.random() * 40; // Reduced range for better visibility
            const yFactor = Math.random() * 20;       // Start at various heights
            const zFactor = -20 + Math.random() * 40;
            const scale = 0.5 + Math.random() * 0.5;  // Random size variation
            temp.push({ t, speed, xFactor, yFactor, zFactor, scale });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            // Update time/position
            particle.t += particle.speed;

            // Simpler falling logic: Downward movement + Sine wave sway
            particle.yFactor -= particle.speed * 5; // Fall speed

            // Reset if below view (y < -10)
            if (particle.yFactor < -10) {
                particle.yFactor = 15; // Reset to top
                particle.xFactor = -20 + Math.random() * 40; // New X pos
                particle.zFactor = -20 + Math.random() * 40; // New Z pos
            }

            // Calculate final position
            dummy.position.set(
                particle.xFactor + Math.sin(particle.t * 2) * 2, // Sway X
                particle.yFactor,                                // Fall Y
                particle.zFactor + Math.cos(particle.t * 1.5) * 2 // Sway Z
            );

            // Rotate the petal based on time for "fluttering"
            dummy.rotation.set(
                particle.t * 0.5,
                particle.t * 0.3,
                particle.t * 0.2
            );

            // Apply scale
            dummy.scale.setScalar(particle.scale);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial
                color="#ffb7b2"
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
                depthWrite={false} // Optimization: disable depth write for transparent particles
            />
        </instancedMesh>
    );
};
