import { sitemapStylesheet } from "@/lib/sitemap";

export function GET() {
  return new Response(sitemapStylesheet(), {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
