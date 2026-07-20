import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DiscoverButton = ({ className }: { className?: string }) => {
  return <Button className={cn("", className)}>DISCOVER</Button>;
};
