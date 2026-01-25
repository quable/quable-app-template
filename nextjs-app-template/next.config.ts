import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins:
        process.env.NODE_ENV === "development"
          ? (process.env.DEV_ALLOWED_ORIGINS || "").split(",")
          : [],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Vary", value: "Origin" },
          { key: "Access-Control-Allow-Methods", value: "*" },
          { key: "Access-Control-Allow-Headers", value: "*" },
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
