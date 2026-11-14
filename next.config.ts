import type { NextConfig } from "next";
import legacyRedirects from "./lib/legacy-redirects.json";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    const list: Array<{ source: string; destination: string; permanent: boolean }> = [];
    const seen = new Set<string>();

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
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "http://127.0.0.1:8000/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
