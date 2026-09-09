export const site = {
  name: "Ocaq",
  fullName: "Ocaq Psixoterapevtlərin İctimai Birliyi",
  logo: "/logo.jpg",
  ogImage: "/og.jpeg",
  heroImage: "/specialists/team-photo-1.jpeg",
  phoneDisplay: "050 358 46 99",
  phoneTel: "+994503584699",
  whatsappNumber: "994503584699",
  instagramUrl: "https://www.instagram.com/ocaq.psixoterapiya.merkezi/",
  instagramHandle: "@ocaq.psixoterapiya.merkezi",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d408.4887644934167!2d49.86022201681514!3d40.39900776108694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIzJzU2LjgiTiA0OcKwNTEnMzcuOCJF!5e1!3m2!1sen!2saz!4v1788860684466!5m2!1sen!2saz",
} as const;

export type SiteConfig = typeof site;

export const ogImageSize = { width: 1200, height: 630 } as const;

/** Absolute origin for Open Graph / canonical URLs. */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
}
