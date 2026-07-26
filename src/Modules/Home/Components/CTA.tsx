import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mt-10 lg:mt-32 flex flex-col gap-4 items-center border border-border shadow-shadow bg-white p-6 rounded-base"
    >
      <h2
        id="cta-heading"
        className="text-xl lg:text-2xl font-bold font-display text-center"
      >
        Ready to discover your next song?
      </h2>

      <p className="text-xl lg:text-2xl font-bold font-display text-center">
        One tap. A few seconds. Thousands of songs waiting.
      </p>

      <Button asChild className="mt-4">
        <Link href="/discover">
          <Headphones />
          Find This Song
        </Link>
      </Button>
    </section>
  );
};
