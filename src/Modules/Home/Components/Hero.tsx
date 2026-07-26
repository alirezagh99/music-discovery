import { MotionAnimation } from "./Hero/motionAnimation";
import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <div className="w-full min-h-[40dvh] lg:h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:items-center">
      <div className="col-span-1 mt-10">
        <HeroText />
      </div>
      <div className="col-span-1 bg-background h-[35vh] lg:h-full relative overflow-x-hidden">
        {/* <AudioFingerprintAnimation /> */}
        <MotionAnimation />
      </div>
    </div>
  );
};
