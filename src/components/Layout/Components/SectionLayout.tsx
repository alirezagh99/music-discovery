import React from "react";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";
import { Section } from "lucide-react";

export const SectionLayout = ({
  children,
  headingText,
  className,
}: {
  children: React.ReactNode;
  headingText: string;
  className?: string;
}) => {
  return (
    <section className={cn("mt-32", className)}>
      <SectionHeading text={headingText} />
      {children}
    </section>
  );
};
