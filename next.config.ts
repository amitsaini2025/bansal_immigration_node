import type { NextConfig } from "next";
import legacyRedirects from "./lib/legacy-redirects.json";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    const list: Array<{
      source: string;
      destination: string;
      permanent?: boolean;
      statusCode?: number;
      has?: Array<{ type: 'host'; value: string }>;
    }> = [
      {
        source: '/:path*',
        destination: 'https://bansalimmigration.com.au/:path*',
        permanent: true,
        has: [{ type: 'host', value: 'www.bansalimmigration.com.au' }],
      },
    ];
    const seen = new Set<string>(['/:path*']);

    for (const [from, to] of Object.entries(legacyRedirects)) {
      if (from && to && from !== to) {
        const cleanFrom = from.endsWith('/') && from !== '/' ? from.slice(0, -1) : from;
        if (!seen.has(cleanFrom)) {
          seen.add(cleanFrom);
          list.push({
            source: cleanFrom,
            destination: to as string,
            permanent: true,
          });
        }
      }
    }

    const customRedirects = [
      { source: '/parent-visas', destination: '/family-visa', statusCode: 301 },
      {
        source: '/family-visa/new-zealand-citizen-family-relationship-461',
        destination: '/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461',
        statusCode: 301,
      },
      {
        source: '/family-visa/orphan-reletive-visa-117',
        destination: '/family-visa/orphan-relative-visa-117',
        statusCode: 301,
      },
      {
        source: '/employer-sponsored/global-talent-employer-sponsored-gtes',
        destination: '/employer-sponsored/gtes',
        statusCode: 301,
      },
      { source: '/our-team', destination: '/team', permanent: true },
      { source: '/people', destination: '/team', permanent: true },
      { source: '/staff', destination: '/team', permanent: true },
      { source: '/pr-calculator', destination: '/migrate-to-australia/pr-point-calculator', permanent: true },
      { source: '/points-for-pr-australia', destination: '/migrate-to-australia/pr-point-calculator', permanent: true },
      { source: '/student-visa-financial-calculator', destination: '/study-australia/student-visa-financial-calculator', permanent: true },
      { source: '/apply-afp-ipc-form', destination: '/afp-national-police-check', permanent: true },
      { source: '/ea-skill-assessment', destination: '/skill-assessment/ea-skill-assessment', permanent: true },
      { source: '/vetassess-skill-assessment', destination: '/skill-assessment/vetassess-skill-assessment', permanent: true },
      { source: '/citizenship-by-descent', destination: '/citizenship/citizenship-by-descent', permanent: true },
      { source: '/can-taxi-drivers-get-pr-australia-dama', destination: '/', permanent: true },
      { source: '/thank-you', destination: '/', permanent: true },
      { source: '/mission-vision', destination: '/about#standards', permanent: true },
      { source: '/why-choose-us', destination: '/about', permanent: true },
      { source: '/why-choose', destination: '/about', permanent: true },
    ];

    for (const item of customRedirects) {
      if (!seen.has(item.source)) {
        seen.add(item.source);
        list.push(item);
      }
    }

    return list;
  },
  async headers() {
    const noIndex = [
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
      },
    ];

    return [
      { source: '/', headers: noIndex },
      { source: '/:path*', headers: noIndex },
    ];
  },
};

export default nextConfig;
