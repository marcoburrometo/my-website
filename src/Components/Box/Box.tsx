/* eslint-disable no-multi-assign */
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { animated } from '@react-spring/three';
import ShpereShader from '../../Shaders/sphereShader';

function Box(props: any): JSX.Element {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    });

    return (
        <animated.mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <sphereBufferGeometry args={[1, 100, 100]} />
            <animated.shaderMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} args={[ShpereShader]} />
        </animated.mesh>
    );
}

export default Box;
