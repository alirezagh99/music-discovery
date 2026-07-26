"use client";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { motion } from "motion/react";

export const MotionAnimation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const yPositions = isMobile ? [0, 100, 0] : [200, 400, 200];

  const particles = Array.from({ length: 60 }, (_, i) => {
    return {
      x: i * 10,
      offset: i * 0.08,
    };
  });

  return (
    <div className="relative">
      {particles.map((particle, i) => {
        const progress = i / particles.length;

        return (
          <motion.div
            key={i}
            className="absolute size-1.5 rounded-full bg-[#4ae897]"
            style={{
              left: particle.x,
              top: "50%",
            }}
            initial={{
              y: yPositions[0],
              opacity: 0,
            }}
            animate={{
              y: yPositions,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -(progress * 6),
            }}
          />
        );
      })}
    </div>
  );
};
