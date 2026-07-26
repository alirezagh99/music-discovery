import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Music Recognition",
  operatingSystem: "Web Browser",
  browserRequirements:
    "Requires JavaScript and microphone access for audio recording.",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Record audio directly in the browser",
    "Audio fingerprint generation",
    "Song recognition",
    "Fast matching against an indexed music database",
    "No permanent storage of recordings",
  ],
};
