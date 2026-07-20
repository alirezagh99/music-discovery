import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavbarItems = ({ navbarItems }: { navbarItems: any[] }) => {
  return (
    <div className="flex items-center gap-4 justify-center">
      {navbarItems.map((item, index) => {
        return (
          <Button variant={"neutralNoShadow"} asChild key={index}>
            <Link href={item.src}>{item.name}</Link>
          </Button>
        );
      })}
    </div>
  );
};
