import { SectionLayout } from "@/components/Layout/Components/SectionLayout";
import { Brain, Lock, MicVocal, Zap } from "lucide-react";

export const Why = () => {
  const data = [
    {
      icon: <MicVocal size={30} />,
      title: "Instant Recognition",
      description: "Identify songs in just a few seconds.",
    },
    {
      icon: <Brain size={30} />,
      title: "Audio Fingerprinting",
      description:
        "Not just filename matching. Every song is converted into unique fingerprints.",
    },
    {
      icon: <Zap size={30} />,
      title: "Runs Fast",
      description: "Optimized search over thousands of fingerprints.",
    },
    {
      icon: <Lock size={30} />,
      title: "Privacy Friendly",
      description: "Your recordings aren't stored permanently.",
    },
  ];

  return (
    <SectionLayout
      headingText={"Why Musicovery?"}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-10 md:col-span-5 lg:col-span-6 flex flex-col gap-6 px-4 py-6 border border-border shadow-shadow rounded bg-white">
          <div>{data[0]["icon"]}</div>
          <h3 className="text-3xl font-display">{data[0]["title"]}</h3>
          <p>{data[0]["description"]}</p>
        </div>
        <div className="col-span-10 md:col-span-5 lg:col-span-4 flex flex-col gap-6 px-4 py-6 border border-border shadow-shadow rounded bg-white">
          <div>{data[1]["icon"]}</div>
          <h3 className="text-3xl font-display">{data[1]["title"]}</h3>
          <p>{data[1]["description"]}</p>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-10 md:col-span-5 lg:col-span-4 flex flex-col gap-6 px-4 py-6 border border-border shadow-shadow rounded bg-white">
          <div>{data[2]["icon"]}</div>
          <h3 className="text-3xl font-display">{data[2]["title"]}</h3>
          <p>{data[2]["description"]}</p>
        </div>
        <div className="col-span-10 md:col-span-5 lg:col-span-6 flex flex-col gap-6 px-4 py-6 border border-border shadow-shadow rounded bg-white">
          <div>{data[3]["icon"]}</div>
          <h3 className="text-3xl font-display">{data[3]["title"]}</h3>
          <p>{data[3]["description"]}</p>
        </div>
      </div>
    </SectionLayout>
  );
};
