import React, { useState, useMemo } from 'react';
import { TextureLoader } from 'three';
import { useSpring, animated, config } from 'react-spring/three';
import HoverImageShader from '../../Shaders/hoverImageShader';

interface Props {
    url: string;
    width: number;
}

function Image({ url, width, ...props }: Props): JSX.Element {
    const [hovered, setHover] = useState(false);

    const [texture] = useMemo(() => {
        const loader = new TextureLoader();
        return [loader.load(url)];
    }, [url]);

    const { hoverValue } = useSpring({
        hoverValue: hovered ? 1 : 0,
        config: config.molasses,
    });

    return (
        <animated.mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} {...props}>
            <circleGeometry attach="geometry" args={[width, 1000]} />
            <animated.shaderMaterial
                attach="material"
                args={[HoverImageShader]}
                uniforms-imgtexture-value={texture}
                uniforms-hover-value={hoverValue}
            />
        </animated.mesh>
    );
}

export default Image;
