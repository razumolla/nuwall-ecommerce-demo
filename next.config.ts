import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bonik-react.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
