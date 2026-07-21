"use client";

import Link from "next/link";
import { DiscoverButton } from "./DiscoverButton";
import { NavbarItems } from "./NavbarItems";
import { NavbarSidebar } from "./NavbarSidebar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navbarItems = [
    { name: "About", src: "/about" },
    { name: "Contact", src: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);

      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full sticky top-0 z-10 transition-all duration-700",
        scrolled ? "bg-background border-b" : "bg-secondary-background",
      )}
    >
      <header className="flex items-center justify-between p-4 w-full lg:px-20">
        <div>
          <Link href={"/"} className="font-display text-2xl select-none">
            MUSICOVERY
          </Link>
        </div>
        <div className="hidden lg:block">
          <NavbarItems navbarItems={navbarItems} />
        </div>
        <div className="lg:hidden">
          <NavbarSidebar
            items={navbarItems}
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
          />
        </div>
        <div className="hidden lg:block">
          <DiscoverButton />
        </div>
        <div className="flex lg:hidden items-center justify-center">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant={"neutralNoShadow"}
            className="size-12 border-transparent bg-white"
          >
            <MenuIcon />
            {/* <Menu size={52} strokeWidth={1.75} /> */}
          </Button>
        </div>
      </header>
    </div>
  );
};
