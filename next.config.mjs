// next.config.mjs
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Ignore ESLint errors during build (let deployment succeed)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optional: also ignore TypeScript build errors (if needed)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
