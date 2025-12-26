import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  
  // Skip type-checking during dev builds
  typescript: {
    ignoreBuildErrors: isDev,
  },
  
  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;