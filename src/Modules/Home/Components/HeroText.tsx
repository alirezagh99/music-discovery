"use client";

import { motion, easeOut } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};

export const HeroText = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-3xl text-center lg:text-start lg:text-6xl flex flex-col gap-6 font-display">
        <motion.span variants={textVariants}>
          Discover Music Around You Instantly
        </motion.span>
        <motion.span variants={textVariants}>
          identify any song in seconds.
        </motion.span>
      </h1>
    </motion.div>
  );
};
