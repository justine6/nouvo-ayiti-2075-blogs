// components/HeroSection.tsx

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
      console.warn(`⚠️ Missing translation for HeroSection.${key}, using fallback "${fallback}"`);
    }
    return dict[key] ?? fallback;
  };

  return (
    <section className="relative bg-cover bg-center py-20 text-white">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {warn("title", "Nouvo Ayiti 2075")}
        </h1>
        <p className="text-lg md:text-xl mb-8">
          {warn("subtitle", "Restoring Dignity. Rebuilding Hope.")}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`/${locale}/vision`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            {warn("readMore", "Read More")}
          </a>
          <a
            href={`/${locale}/join`}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            {warn("joinNow", "Join Us")}
          </a>
          <a
            href="https://www.youtube.com/@blogs-nouvoayiti2075"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            {warn("watchVideos", "Watch Videos")}
          </a>
          <a
            href="https://foundation.nouvoayiti2075.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold"
          >
            {warn("goToMain", "Main Website")}
          </a>
        </div>
      </div>
    </section>
  );
}
