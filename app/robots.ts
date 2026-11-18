import type { MetadataRoute } from 'next';

/**
 * Testing site. Every crawler is blocked except Googlebot and Bingbot.
 * Those two are allowed to fetch pages so they can read the noindex tag
 * and keep the URLs out of search. Blocking them in robots.txt can leave
 * a bare URL in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.bansalimmigration.com.au/sitemap.xml',
  };
}
