import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { getSiteUrl, site } from "@/data/site";
import { routes } from "@/i18n/paths";

const pages = Object.values(routes);

type SitemapEntry = {
  url: string;
  priority: number;
  languages: Record<string, string>;
};

export function getSitemapEntries(origin = getSiteUrl()): SitemapEntry[] {
  return locales.flatMap((locale) =>
    pages.map((segment) => ({
      url: pageUrl(origin, locale, segment),
      priority: pagePriority(segment),
      languages: languageAlternates(origin, segment),
    })),
  );
}

export function buildSitemapXml(origin = getSiteUrl()): string {
  const entries = getSitemapEntries(origin)
    .map((entry) => {
      const links = Object.entries(entry.languages)
        .map(
          ([lang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
${links}
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

export function sitemapStylesheet(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="az">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap · ${escapeXml(site.name)}</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: #f5f6f4;
            color: #243038;
            font: 16px/1.5 system-ui, sans-serif;
          }
          main {
            max-width: 960px;
            margin: 0 auto;
            padding: 2.5rem 1.25rem 4rem;
          }
          h1 {
            margin: 0 0 0.35rem;
            color: #3a4550;
            font-size: 1.75rem;
            font-weight: 650;
          }
          .lede {
            margin: 0 0 1.75rem;
            color: #667078;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #dfe5e3;
            border-radius: 12px;
            overflow: hidden;
          }
          th, td {
            padding: 0.7rem 0.9rem;
            text-align: left;
            vertical-align: top;
            border-bottom: 1px solid #dfe5e3;
          }
          th {
            background: #eaf2f1;
            color: #4a7372;
            font-size: 0.8rem;
            letter-spacing: 0.02em;
            text-transform: uppercase;
          }
          tr:last-child td { border-bottom: 0; }
          a { color: #2a7a78; text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .prio { font-variant-numeric: tabular-nums; color: #667078; }
          .langs { color: #667078; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <main>
          <h1>${escapeXml(site.name)} sitemap</h1>
          <p class="lede">
            <xsl:value-of select="count(s:urlset/s:url)"/> pages for search engines.
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priority</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td class="prio"><xsl:value-of select="s:priority"/></td>
                  <td class="langs">
                    <xsl:for-each select="xhtml:link">
                      <xsl:value-of select="@hreflang"/>
                      <xsl:if test="position() != last()"> · </xsl:if>
                    </xsl:for-each>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
}

function pageUrl(origin: URL, locale: Locale, segment: string): string {
  return new URL(localePath(locale, segment ? `/${segment}` : "/"), origin)
    .href;
}

function languageAlternates(origin: URL, segment: string) {
  const languages: Record<string, string> = {
    "x-default": pageUrl(origin, defaultLocale, segment),
  };

  for (const locale of locales) {
    languages[locale] = pageUrl(origin, locale, segment);
  }

  return languages;
}

function pagePriority(segment: string): number {
  if (!segment) return 1;
  if (segment === routes.privacy || segment === routes.terms) return 0.3;
  return 0.8;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
