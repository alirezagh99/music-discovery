"use client";

import { motion, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export const HowWorksItem = ({
  step,
  trigger,
  className,
  id,
  progress,
}: {
  step: string;
  trigger: number;
  className?: string;
  id: number;
  progress: any;
}) => {
  const color = useTransform(
    progress,
    [trigger - 0.05, trigger],
    ["#9ca3af", "#4f4007"],
  );

  const backgroundColor = useTransform(
    progress,
    [trigger - 0.05, trigger],
    ["#ffffff", "#ffd93d"],
  );

  const scale = useTransform(progress, [trigger - 0.04, trigger], [1, 1.06]);

  const opacity = useTransform(progress, [trigger - 0.04, trigger], [0.55, 1]);
  return (
    <div className={cn("mt-10 lg:mt-12", id % 2 && "text-end", className)}>
      <motion.div
        style={{
          backgroundColor,
          scale,
          opacity,
        }}
        className="
      inline-flex
      flex-col
      gap-2
      rounded-lg
      border-4
      border-black
      px-6
      py-5
      shadow-[4px_4px_0px_#111]
      will-change-transform
      w-full lg:w-100
      lg:min-w-100 text-center
    "
      >
        {/* <span className="text-sm font-black tracking-widest text-muted-foreground">
          {String(id + 1).padStart(2, "0")}
        </span> */}

        <motion.h3
          style={{ color }}
          className="
        text-xl lg:text-3xl
        font-black
        uppercase
        leading-none
        tracking-tight
      "
        >
          {step}
        </motion.h3>
      </motion.div>
    </div>
  );
};
