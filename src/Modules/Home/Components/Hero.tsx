import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
      <div className="col-span-1">
        <HeroText />
      </div>
      <div className="col-span-1 bg-gray-500 h-full">animation</div>
    </div>
  );
};
