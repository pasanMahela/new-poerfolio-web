import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Custom 3D Model Loader
function CharacterGLTF() {
    const { scene } = useGLTF("/6930adea134036151dfe99d8.glb");

    // Set professional standing pose
    scene.rotation.y = 0; // Face forward

    // Professional presentation pose: hands together at chest level
    scene.traverse((child) => {
        if (child.isBone) {
            const boneName = child.name.toLowerCase();

            // Upper arms - elbows close to body, bent upward
            if (boneName.includes('leftarm') || boneName.includes('left_arm') || boneName.includes('l_arm') ||
                boneName.includes('upperarm_l') || boneName.includes('shoulder_l')) {
                child.rotation.x = 1.2;
                child.rotation.z = 0.1;
                child.rotation.y = -0.2;
            }
            if (boneName.includes('rightarm') || boneName.includes('right_arm') || boneName.includes('r_arm') ||
                boneName.includes('upperarm_r') || boneName.includes('shoulder_r')) {
                child.rotation.x = 1.2;
                child.rotation.z = -0.1;
                child.rotation.y = 0.2;
            }

            // Forearms - angle inward toward center
            if (boneName.includes('leftforearm') || boneName.includes('left_forearm') || boneName.includes('l_forearm') ||
                boneName.includes('lowerarm_l')) {
                child.rotation.x = -1.3;
                child.rotation.y = 0.3;
            }
            if (boneName.includes('rightforearm') || boneName.includes('right_forearm') || boneName.includes('r_forearm') ||
                boneName.includes('lowerarm_r')) {
                child.rotation.x = -1.3;
                child.rotation.y = -0.3;
            }

            // Hands - relaxed presentation gesture
            if (boneName.includes('lefthand') || boneName.includes('left_hand') || boneName.includes('l_hand') ||
                boneName.includes('hand_l')) {
                child.rotation.x = -0.2;
                child.rotation.z = 0.1;
            }
            if (boneName.includes('righthand') || boneName.includes('right_hand') || boneName.includes('r_hand') ||
                boneName.includes('hand_r')) {
                child.rotation.x = -0.2;
                child.rotation.z = -0.1;
            }
        }
    });

    return (
        <primitive
            object={scene}
            scale={2.2}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

export default function ThreeCharacter() {
    return (
        <Canvas
            camera={{ position: [0, 0.5, 5], fov: 50 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true }}
        >
            <ambientLight intensity={1.0} />
            <directionalLight position={[5, 5, 5]} intensity={1.1} />
            <Suspense fallback={null}>
                <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
                    <CharacterGLTF />
                </Float>
                <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
        </Canvas>
    );
}
