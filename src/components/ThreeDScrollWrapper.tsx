import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ThreeDScrollWrapperProps {
  children: React.ReactNode;
}

export default function ThreeDScrollWrapper(props: ThreeDScrollWrapperProps) {
  const { children } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Track the scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate high-end 3D transforms based on scroll position
  // 0 is when the section's top enters the viewport.
  // 0.5 is when it is centered.
  // 1 is when its bottom exits the top of the viewport.
  
  // rotateX curves the section toward the user coming in, flattens, then curves away going out
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  
  // scale adds realistic distance/depth
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.92, 1, 1, 0.92]);
  
  // y adds an organic micro-parallax lift
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  
  // opacity provides elegant transitions
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ perspective: "1200px" }} // Activates 3D rendering context
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="w-full origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
