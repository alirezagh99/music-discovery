"use client";

import { HowWorksItem } from "./HowWorksItem";
import { useRef } from "react";
import { useScroll } from "motion/react";
import { SectionHeading } from "@/components/Layout/Components/SectionHeading";
import { WaveformProgress } from "./WaveformProgress";

export const HowWorks = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      id: 0,
      heading: "Record sound",
      side: "left",
      trigger: 0.1,
    },
    {
      id: 1,
      heading: "Analyze waveform",
      side: "right",
      trigger: 0.4,
    },
    {
      id: 2,
      heading: "Create fingerprint",
      side: "left",
      trigger: 0.6,
    },
    {
      id: 3,
      heading: "Find song",
      side: "right",
      trigger: 0.9,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="mt-32" ref={sectionRef}>
      <div className="relative h-[300vh]">
        <div className="top-24 sticky h-[80vh]">
          <SectionHeading text={"How Musicovery works"} />

          {/* <div className="relative">
            <Waveform3SVG className="absolute top-0 left-0" />
            <Waveform4SVG height={430} className="absolute top-0 left-0" />
          </div> */}

          {steps.map((step) => {
            return (
              <HowWorksItem
                step={step.heading}
                trigger={step.trigger}
                key={step.id}
                id={step.id}
                progress={scrollYProgress}
              />
            );
          })}

          <WaveformProgress
            start={0.1}
            end={0.4}
            progress={scrollYProgress}
            className="absolute top-0 left-[47%] -translate-y-14 rotate-100 hidden lg:block"
          />

          <WaveformProgress
            start={0.4}
            end={0.6}
            progress={scrollYProgress}
            className="absolute top-0 left-[47%] translate-y-20 rotate-[-100deg] hidden lg:block"
          />

          <WaveformProgress
            start={0.6}
            end={0.9}
            progress={scrollYProgress}
            className="absolute top-0 left-[47%] translate-y-56 rotate-100 hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};
