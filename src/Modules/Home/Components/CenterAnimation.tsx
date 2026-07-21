"use client";

import { motion } from "motion/react";

export const CenterAnimation = () => {
  return (
    <svg width="100" height="300" viewBox="0 0 100 300">
      <motion.path
        d="
    M50 10
    Q10 40 50 70
    T50 130
    T50 190
    T50 250
    T50 290
  "
        stroke="#ffd93d"
        strokeWidth="4"
        fill="none"
        animate={{
          pathLength: [0, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </svg>
  );
};
