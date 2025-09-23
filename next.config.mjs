// next.config.mjs
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Silence the multiple lockfiles warning
  outputFileTracingRoot: __dirname,

  webpack: (config) => {
    // Example alias for imports
    config.resolve.alias["@"] = path.join(__dirname, "app");
    config.resolve.alias["@components"] = path.join(__dirname, "app/components");
    config.resolve.alias["@lib"] = path.join(__dirname, "app/lib");
    return config;
  },
};

export default nextConfig;
