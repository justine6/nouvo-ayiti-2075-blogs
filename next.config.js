import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,

  i18n: {
    locales: ["en", "fr", "ht", "es"], // supported languages
    defaultLocale: "en",               // fallback language
  },
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
