import { useState, useEffect } from 'react';

export const useScroll = (threshold: number = 0) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > threshold);
        };

        // Check on initial load
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return { isScrolled, scrollY };
};
