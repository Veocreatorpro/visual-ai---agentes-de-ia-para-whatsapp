import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollY } = useScroll();
  
  // Create a spring-smoothed version of the scroll position
  const smoothY = useSpring(scrollY, {
    stiffness: 45, // Low stiffness for cinematic flow
    damping: 15,   // Higher damping for 0 overshoot
    mass: 0.5,
    restDelta: 0.001
  });

  // Inverse the smoothed scroll for the vertical shift
  const y = useTransform(smoothY, (v) => -v);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [children]);

  return (
    <>
      {/* Spacer to allow standard scrollbars and behavior */}
      <div style={{ height: contentHeight }} />
      
      {/* The actual content that gets shifted */}
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 right-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}
