import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { DiscoverButton } from "./DiscoverButton";
import { Button } from "@/components/ui/button";

interface Props {
  items: any[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0  bg-background">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item, index) => {
            return (
              <Link
                href={item.src}
                key={index}
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center items-center mx-4 mb-20">
          <Button asChild className={"w-full"}>
            <Link onClick={() => onOpenChange(false)} href={"/discover"}>
              DISCOVER YOUR MUSIC
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
