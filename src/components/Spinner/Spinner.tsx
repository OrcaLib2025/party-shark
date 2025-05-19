import React, { useEffect, useRef, useState } from 'react';

import cl from './Spinner.module.scss';

export const Spinner: React.FC = () => {
    const spinnerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number>(0);

    useEffect(() => {
        const resizeHandler = () => {
            if (spinnerRef.current) {
                const width = spinnerRef.current.offsetWidth;
                const height = spinnerRef.current.offsetHeight;
                setSize(Math.min(width, height));
            }
        };

        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <div ref={spinnerRef} className={cl['spinner']}>
            <div
                className={cl['spinner-circle']}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        </div>
    );
};
