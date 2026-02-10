import { Float, Sparkles, MeshTransmissionMaterial, Environment, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, TiltShift } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { StoryOverlay } from './StoryOverlay';
import { SakuraParticles } from './SakuraParticles';
import { FloatingPolaroids } from './FloatingPolaroids';

const HeartShape = ({ isMobile, ...props }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    // Subtle internal rotation for organic feel
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    const shape = useMemo(() => {
        const x = -0.025;
        const y = -0.025;
        const s = new THREE.Shape();
        s.moveTo(x + 5, y + 5);
        s.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        s.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        s.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        s.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        s.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        s.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
        return s;
    }, []);

    // OPTIMIZATION: Reduce geometry detail on mobile
    const extrudeSettings = useMemo(() => ({
        depth: 4,
        bevelEnabled: true,
        bevelSegments: isMobile ? 3 : 8,   // Reduced from 8
        steps: isMobile ? 2 : 4,           // Reduced from 4
        bevelSize: 1.5,
        bevelThickness: 1.5,
        curveSegments: isMobile ? 12 : 32  // Reduced from 32
    }), [isMobile]);

    return (
        <group {...props} scale={0.015} rotation={[Math.PI, 0, 0]}>
            <mesh ref={meshRef}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                {/* OPTIMIZATION: Reduce material quality on mobile */}
                <MeshTransmissionMaterial
                    ref={materialRef}
                    backside
                    samples={isMobile ? 2 : 4}       // Reduced samples
                    resolution={isMobile ? 128 : undefined} // Limit resolution
                    thickness={2}
                    chromaticAberration={isMobile ? 0.1 : 0.5} // Less expensive effect
                    anisotropy={isMobile ? 0 : 0.5}  // Disable anisotropy
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={isMobile ? 0 : 0.2} // Disable temporal distortion
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    clearcoat={1}
                    roughness={0.1}
                    color="#ffcfcf"
                    attenuationDistance={0.5}
                    attenuationColor="#ff8080"
                />
            </mesh>
        </group>
    );
}

const AnimatedHeart = () => {
    const { viewport } = useThree();
    const scroll = useScroll();
    const groupRef = useRef<THREE.Group>(null);

    // Mobile Check
    const isMobile = viewport.width < 5;
    const slideDistance = isMobile ? 0.5 : 1.5;

    useFrame(() => {
        if (!groupRef.current) return;

        // r1: 0 to 1 scroll progress
        const r1 = scroll.range(0, 1 / 3); // 0 to 33%
        const r2 = scroll.range(1 / 3, 1 / 3); // 33% to 66%
        const r3 = scroll.range(2 / 3, 1 / 3); // 66% to 100%

        // Phase 1: Slide Left (0 -> 33%)
        // We want 0 -> -slideDistance
        // Phase 2: Slide Right (-slideDistance -> +slideDistance)
        // Phase 3: Center (+slideDistance -> 0)

        // Use exact logic requested:
        // 0 -> 33%: Slide Left (-1.5)
        // 33% -> 66%: Slide Right (1.5) + Spin
        // 66% -> 100%: Center (0) + Scale Up

        const targetX = 0 +
            (r1 * -slideDistance) + // Move left
            (r2 * (slideDistance * 2)) + // Move from left (-1.5) to right (+1.5) = +3.0 diff
            (r3 * -slideDistance); // Move from right (+1.5) to center (0) = -1.5 diff

        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);

        // Rotation Logic
        // Phase 1: Rotate to face right text? (User asked to face right)
        // Phase 2: Spin 360 vertically (rotation.x)
        const targetRotX = r2 * Math.PI * 2;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);

        // Scale Logic
        // Phase 3: Scale up to 1.2
        const baseScale = isMobile ? 0.6 : 1;
        const targetScale = baseScale + (r3 * 0.4); // 1 + 0.4 = 1.4 (approx 1.2 relative)
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    });

    return (
        <group ref={groupRef}>
            {/* Main "Breathing" Heart */}
            <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={1.5}
                floatingRange={[-0.2, 0.2]}
            >
                {/* Check: Passing isMobile to HeartShape */}
                <HeartShape position={[0, 0.5, 0]} isMobile={isMobile} />
            </Float>

            {/* Background hearts tied to main group or static? 
                User implied "The Heart" (singular), but preserving background hearts adds depth.
                Let's keep them attached so they move with the story.
            */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
                <HeartShape position={[-3, 2, -4]} scale={0.8} isMobile={isMobile} />
                <HeartShape position={[3, -1.5, -3]} scale={0.8} isMobile={isMobile} />
                <HeartShape position={[-2.5, -3, -2]} scale={0.6} isMobile={isMobile} />
                <HeartShape position={[2.5, 3, -5]} scale={0.6} isMobile={isMobile} />
            </Float>
        </group>
    );
}

export const Experience = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;

    return (
        <>
            {/* Deep Romantic Background - Reverted to Soft Rose */}
            <color attach="background" args={['#fff0f3']} />

            {/* Environment & Lighting */}
            <Environment preset="sunset" background={false} blur={0.5} />
            {/* OPTIMIZATION: Reduce shadow map size or turn off castShadow for some lights on mobile? 
                Keeping castShadow for now as it's key for the 'cinematic' look, but could turn off if extremely slow.
            */}
            <spotLight position={[-5, 5, 5]} angle={0.5} penumbra={1} intensity={2} castShadow={!isMobile} color="#ffb7b2" />
            <ambientLight intensity={0.2} />

            <Sparkles count={150} scale={6} size={3} speed={0.4} opacity={0.5} color="#ffb7b2" />

            {/* Anime Blossom Theme - Falling Petals */}
            <SakuraParticles count={isMobile ? 30 : 100} />

            {/* Floating Memories - Drifting Photos */}
            <FloatingPolaroids />

            {/* Scroll Controls Wrapper */}
            <ScrollControls pages={4} damping={0.2}>
                {/* 3D Scroll Content */}
                <AnimatedHeart />

                {/* HTML Overlay */}
                <Scroll html style={{ width: '100%' }}>
                    <StoryOverlay />
                </Scroll>
            </ScrollControls>

            {/* Cinematic Post Processing */}
            {/* Cinematic Post Processing - Desktop Only */}
            <EffectComposer enabled={!isMobile}>
                <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.5} />
                <Vignette offset={0.5} darkness={0.4} />
                <Noise opacity={0.03} />
                <TiltShift bandwidth={0.6} blur={0.15} />
            </EffectComposer>
        </>
    );
};
