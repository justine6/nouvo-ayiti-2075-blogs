"use client";

import { motion } from "framer-motion";

type HeroSectionProps = {
  locale: string;
  dict?: {
    title?: string;
    subtitle?: string;
    goToMain?: string;
    readMore?: string;
    joinNow?: string;
    watchVideos?: string;
  };
};

export default function HeroSection({ locale, dict = {} }: HeroSectionProps) {
  const warn = (key: keyof NonNullable<typeof dict>, fallback: string) => {
    if (process.env.NODE_ENV === "development" && !dict[key]) {
      console.warn(
        `⚠️ Missing translation for HeroSection.${key}, using fallback "${fallback}"`,
      );
    }
    return dict[key] ?? fallback;
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
        viewport={{ once: true, amount: 0.6 }} // 👈 animates only when 60% of the section is in view
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
          {/* Vision link */}
          <a
            href={`https://nouvoayiti2075.com/${locale}/vision`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            {warn("readMore", "Read the Vision")}
          </a>

          {/* Join Now */}
          <a
            href={`https://nouvoayiti2075.com/${locale}/join`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            {warn("joinNow", "Join the Movement")}
          </a>

          {/* Watch Videos */}
          <a
            href="https://www.youtube.com/@blogs-nouvoayiti2075"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            {warn("watchVideos", "Watch Videos")}
          </a>

          {/* Main Website */}
          <a
            href="https://foundation.nouvoayiti2075.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold"
          >
            {warn("goToMain", "Main Website")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}







