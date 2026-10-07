import type { NextConfig } from "next";

const cloudinaryCloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Default widths minus 3840px: 4K variants are never needed here and waste bandwidth.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Only our own photos (and the configured Cloudinary account) can be optimised.
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/api/uploads/**", search: "" },
    ],
    remotePatterns: cloudinaryCloud
      ? [{ protocol: "https", hostname: "res.cloudinary.com", pathname: `/${cloudinaryCloud}/image/upload/**` }]
      : [],
  },
  experimental: {
    // Local uploads are compressed in the browser first; this leaves headroom.
    serverActions: { bodySizeLimit: "9mb" },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
