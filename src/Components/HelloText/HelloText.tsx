import * as THREE from 'three';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Model, Fragments } from './Text';

function Scene({ isDarkMode }: { isDarkMode: boolean }) {
    const vec = new THREE.Vector3();
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);
    useFrame((state) => {
        state.camera.position.lerp(vec.set(clicked ? -10 : 0, clicked ? 10 : 0, 20), 0.1);
        state.camera.lookAt(0, 0, 0);
    });
    return (
        <group>
            <Fragments visible={clicked} isDarkMode={isDarkMode} />
            <Model
                visible={!clicked}
                onClick={() => setClicked(true)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            />
        </group>
    );
}

export default function HelloText({ isDarkMode }: { isDarkMode: boolean }): JSX.Element {
    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <span style={{ position: 'absolute', overflow: 'hidden', marginTop: -70, marginLeft: -30 }}>
            <Canvas dpr={[1, 2]} orthographic camera={{ zoom: 80 }}>
                {/* <Canvas dpr={window.devicePixelRatio || 1} camera={{ fov: 75, position: [0, 0, 7] }} orthographic> */}
                <ambientLight intensity={2} color={isDarkMode ? '#f3f4f6' : '#111827'} />
                <Suspense fallback={null}>
                    <Scene isDarkMode={isDarkMode} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </span>
    );
}
