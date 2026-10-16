import type { NextConfig } from "next";

// Must match the public URL the site is served from.
// Deploying to /home/mcpr2027/public_html => https://ccc.inaoep.mx/~mcpr2027/
// Override for other paths with: NEXT_PUBLIC_BASE_PATH=/~mcpr npm run build
// Vercel sets VERCEL=1 at build time; there the site is served from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL ? "" : "/~mcpr2027");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;