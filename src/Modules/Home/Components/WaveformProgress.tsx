import { cn } from "@/lib/utils";
import { Waveform3SVG } from "@/svgs/waveform3SVG";
import { Waveform4SVG } from "@/svgs/waveform4SVG";
import { useTransform, motion, useMotionValueEvent } from "motion/react";

export const WaveformProgress = ({
  progress,
  className,
  start,
  end,
}: {
  progress: any;
  className: string;
  start: number;
  end: number;
}) => {
  const clipPath = useTransform(
    progress,
    [start, end],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    {
      clamp: true,
    },
  );

  useMotionValueEvent(clipPath, "change", (latest) => {
    console.log(latest);
  });

  return (
    <div>
      <div className={className}>
        <Waveform3SVG />
      </div>
      <motion.div
        style={{ clipPath }}
        className={cn("overflow-hidden", className)}
      >
        <Waveform4SVG />
      </motion.div>
    </div>
  );
};
