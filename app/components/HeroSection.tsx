// app/components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type HeroSectionDict = {
  title?: string;
  subtitle?: string;
  goToMain?: string;
  readMore?: string;
  joinNow?: string;
  watchVideos?: string;
};

type HeroSectionProps = {
  locale: string;
  dict?: HeroSectionDict;
};

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const safeLocale = (locale || "en").trim();

  // Safe logger + fallback helper
  const warn = (key: keyof HeroSectionDict, fallback: string): string => {
    const value = dict?.[key];

    if (process.env.NODE_ENV === "development" && !value) {
      console.warn(
        `⚠️ Missing translation for HeroSection.${String(
          key,
        )}, using fallback "${fallback}"`,
      );
    }

    return value ?? fallback;
  };

  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/haiti-map.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {warn("title", "Nouvo Ayiti 2075")}
        </motion.h1>

        <motion.p
          className="text-xl mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {warn("subtitle", "Restoring Dignity. Rebuilding Hope.")}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
        >
          {/* Read the Vision – blue */}
          <Link
            href={`https://nouvoayiti2075.com/${safeLocale}/vision`}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 hover:scale-105 transition-transform"
          >
            {warn("readMore", "Read the Vision")}
          </Link>

          {/* Join the Movement – green */}
          <Link
            href={`https://nouvoayiti2075.com/${safeLocale}/join`}
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 hover:scale-105 transition-transform"
          >
            {warn("joinNow", "Join the Movement")}
          </Link>

          {/* Watch Videos – red */}
          <Link
            href="https://www.youtube.com/@blogs-nouvoayiti2075"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 hover:scale-105 transition-transform"
          >
            {warn("watchVideos", "Watch Videos")}
          </Link>

          {/* Main Website – yellow */}
          <Link
            href="https://foundation.nouvoayiti2075.com"
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-500 hover:scale-105 transition-transform"
          >
            {warn("goToMain", "Main Website")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
