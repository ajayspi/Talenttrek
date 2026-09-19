import type { NextConfig } from "next";

/**
 * Security headers per deployment spec. CSP is crafted per deployment
 * (needs nonce support at the edge) and intentionally omitted for launch.
 * Note: X-Frame-Options applies to OUR pages only — the Google Maps iframe
 * on /contact embeds Google's origin and is unaffected.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "talenttrek.com.au" }],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
