/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import * as THREE from 'three';
import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const normalMaterial = new THREE.MeshNormalMaterial();

export function Fragments({ visible, isDarkMode, ...props }: any): JSX.Element {
    const group = useRef();
    const { scene, animations, materials } = useGLTF('/hello-fragments.glb') as any;
    const { actions } = useAnimations(animations, group);
    // Exchange inner material
    useMemo(
        () =>
            scene.traverse((o: any) => {
                if (o.material?.color) {
                    o.material.color.set(isDarkMode ? '#f3f4f6' : '#111827');
                }
                return o.type === 'Mesh' && o.material === materials.inner && (o.material = normalMaterial);
            }),
        [isDarkMode],
    );
    // Play actions
    useEffect(() => {
        if (visible) {
            Object.keys(actions).forEach((key) => {
                if (actions && actions[key]) {
                    (actions[key] as any).repetitions = 0;
                    (actions[key] as any).clampWhenFinished = true;
                    (actions[key] as any).play();
                }
            });
        }
    }, [visible]);
    return <primitive ref={group} object={scene} g {...props} />;
}

export function Model(props: any): JSX.Element {
    const { scene } = useGLTF('/hello-text.glb');
    return <primitive object={scene} {...props} />;
}

useGLTF.preload('/hello-text.glb');
useGLTF.preload('/hello-fragments.glb');
