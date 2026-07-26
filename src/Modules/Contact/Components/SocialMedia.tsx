import { Button } from "@/components/ui/button";

export const SocialMedia = () => {
  const socialMedias = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/alireza-qasemi-58a754222",
    },
    { name: "Github", href: "https://github.com/alirezagh99" },
    { name: "Telegram", href: "https://t.me/arleiza" },
    { name: "Whatsapp", href: "https://wa.me/989374300865" },
  ];

  return (
    <div className="mt-4 lg:mt-10 flex flex-col md:flex-row gap-4 items-center justify-center border border-border shadow-shadow bg-white p-6 rounded-base">
      {socialMedias.map((item, index) => {
        return (
          <Button
            asChild
            className="border w-full md:w-auto"
            variant={"default"}
            key={index}
          >
            <a href={item.href} target="_blank">
              {item.name}
            </a>
          </Button>
        );
      })}
    </div>
  );
};
