import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/work-with-us", permanent: true },
      { source: "/creative-studio", destination: "/studio", permanent: true },
      { source: "/digital-solutions", destination: "/products", permanent: true },
      { source: "/stories-comics", destination: "/originals", permanent: true },
    ];
  },
};

export default nextConfig;