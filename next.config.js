import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
