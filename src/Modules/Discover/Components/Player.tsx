import { Slider } from "@/components/ui/slider";

export const Player = () => {
  return (
    <div className="w-1/2">
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  );
};
