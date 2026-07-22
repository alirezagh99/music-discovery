import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

export const CTA = () => {
  return (
    <section className="mt-10 lg:mt-32 flex flex-col gap-4 items-center border border-border shadow-shadow bg-white p-6 rounded-base">
      <p className="text-xl lg:text-2xl font-bold font-display text-center">
        Ready to discover your next song?
      </p>
      <p className="text-xl lg:text-2xl font-bold font-display text-center">
        One tap. A few seconds. Thousands of songs waiting.
      </p>
      <Button className="mt-4">
        <Headphones /> Identify a Song
      </Button>
    </section>
  );
};
