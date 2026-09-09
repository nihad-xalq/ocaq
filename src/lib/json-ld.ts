import type { Dictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import { getSiteUrl, site } from "@/data/site";
import { faqs } from "@/data/faqs";

export function siteJsonLd(locale: Locale, description: string) {
  const origin = getSiteUrl().origin;
  const organizationId = `${origin}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": organizationId,
        name: site.name,
        legalName: site.fullName,
        url: origin,
        logo: new URL(site.logo, origin).href,
        image: new URL(site.ogImage, origin).href,
        description,
        email: site.email,
        telephone: site.phoneTel,
        inLanguage: locale,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressCountry: "AZ",
        },
        sameAs: [site.instagramUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: site.name,
        inLanguage: [...locales],
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function faqJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: dict.faqs[faq.id].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: dict.faqs[faq.id].answer,
      },
    })),
  };
}
