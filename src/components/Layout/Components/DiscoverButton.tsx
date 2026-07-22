import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const DiscoverButton = ({ className }: { className?: string }) => {
  return (
    <Button asChild className={cn("", className)}>
      <Link href={"/discover"}>DISCOVER</Link>
    </Button>
  );
};
