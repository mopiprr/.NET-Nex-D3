import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // day3 : authorization
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
