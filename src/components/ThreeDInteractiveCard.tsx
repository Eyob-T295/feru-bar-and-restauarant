import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ThreeDInteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export default function ThreeDInteractiveCard(props: ThreeDInteractiveCardProps) {
  const { children, className = "" } = props;
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Motion values to store mouse coordinates relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for smooth reactive rotation
  const rotateXSpring = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20
  });
  const rotateYSpring = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20
  });

  // Glare overlay values
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, 0]), {
    stiffness: 150,
    damping: 20
  });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [100, 0]), {
    stiffness: 150,
    damping: 20
  });
  const glareOpacity = useSpring(useTransform(x, [-0.5, 0.5], [0.15, 0]), {
    stiffness: 150,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Get card bounding rectangle
    const rect = cardRef.current.getBoundingClientRect();

    // Mouse position relative to physical element
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Represent position as range [-0.5, 0.5]
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Reset positions back to centered
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={`relative group transition-all duration-300 ${className}`}
    >
      {/* Glare/Sheen Highlight Layer */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none rounded-lg bg-gradient-to-tr from-transparent via-gold-400/20 to-transparent mix-blend-overlay"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([xVal, yVal]) => `radial-gradient(circle at ${xVal}% ${yVal}%, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0) 60%)`
          ),
          opacity: glareOpacity
        }}
      />
      
      {/* Target Content Frame */}
      <div 
        style={{ transform: "translateZ(25px)" }} // Thrusts content slightly forwards inside 3D environment
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
