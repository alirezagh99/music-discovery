import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Musicovery - Song Recognition",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "Musicovery",
  },
};
