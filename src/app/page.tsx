import { Hero } from "@/Modules/Home/Components/Hero";
import { HowWorks } from "@/Modules/Home/Components/HowWorks";
import { Why } from "@/Modules/Home/Components/Why";
import { FAQ } from "@/Modules/Home/Components/FAQ";
import { CTA } from "@/Modules/Home/Components/CTA";
import { faqSchema } from "@/lib/seo/faq-schema";

export default function Home() {
  return (
    <div className={"flex flex-col gap-6 px-4 container 2xl:max-w-360 mx-auto"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Hero />
      <HowWorks />
      <Why />
      <FAQ />
      <CTA />
    </div>
  );
}
