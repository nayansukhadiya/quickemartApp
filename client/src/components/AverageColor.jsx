import React, { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color'; // Named import

const ImageContainer = () => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [color, setColor] = useState('#fff');
    const [textColor, setTextColor] = useState('#000');

    useEffect(() => {
        const fac = new FastAverageColor();
        const imgElement = imageRef.current;
        const containerElement = containerRef.current;

        if (imgElement) {
            fac.getColorAsync(imgElement)
                .then((color) => {
                    containerElement.style.backgroundColor = color.rgba;
                    setTextColor(color.isDark ? '#fff' : '#000');
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ color: textColor, padding: '20px', textAlign: 'center' }}
            className="image-container"
        >
            <img ref={imageRef} src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/ff6a2d4fc2dd5520d7d7967c72e4cf83" alt="Example" />
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
        </div>
    );
};

export default ImageContainer;
