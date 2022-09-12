import React, { memo, useEffect } from 'react';

const style = {
    color: 'white',
    height: '100%', // Canvas is will respond to size changes without resetting fluid!
    width: '100%',
    margin: 0,
};

function Fluid() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = './fluid-init.js';
        script.async = true;
        // script.onload = () => this.fluidLoaded();
        document.body.appendChild(script);
    }, []);
    return <canvas className="fluid-canvas" style={style} />;
}

export default memo(Fluid);
