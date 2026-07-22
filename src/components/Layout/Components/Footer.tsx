import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const socialMedia = [
    { name: "instagram", src: "/socialMedia/linkedin.png" },
    { name: "spotify", src: "/socialMedia/spotify.png" },
    { name: "instagram", src: "/socialMedia/instagram.png" },
  ];

  const navigationItems = [
    { name: "about", src: "/about" },
    { name: "contact", src: "/contact" },
  ];

  return (
    <footer className="mt-32 border-t border-border p-4 bg-white">
      <div className="mt-10 container 2xl:max-w-360 mx-auto px-4 h-full grid grid-cols-6 gap-14 lg:gap-0">
        <div className="col-span-6 lg:col-span-2 flex flex-col items-center lg:items-start gap-4">
          <h3 className="font-display text-lg">Social Media</h3>
          <div className="flex gap-2">
            {socialMedia.map((item, index) => {
              return (
                <Button
                  key={index}
                  asChild
                  variant={"noShadow"}
                  className="px-0 ps-0.5"
                >
                  <Link href={"/"}>
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 flex flex-col items-center lg:items-start gap-4">
          <h3 className="font-display text-lg">Quick Access</h3>
          <div className="flex flex-col">
            {navigationItems.map((item, index) => {
              return (
                <div key={index}>
                  <Link className="inline" href={item.src}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 flex flex-col items-center lg:items-start gap-4">
          <Link href={"/"} className="font-display text-2xl select-none">
            MUSICOVERY
          </Link>
          <p className="text-sm">Discovery Your Music</p>
        </div>
      </div>
    </footer>
  );
};
