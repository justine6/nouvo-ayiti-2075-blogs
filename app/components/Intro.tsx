import type { Locale } from "@/lib/i18n/get-dictionary";

type IntroProps = {
  title: string;    // from dict.title
  subtitle: string; // from dict.subtitle
  locale: Locale;
};

export default function Intro({ title, subtitle }: IntroProps) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="text-lg mt-5 md:pl-8 text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </section>
  );
}
