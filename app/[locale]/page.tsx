// app/[locale]/page.tsx
import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const dict = await getDictionary(params.locale);

  return (
    <main>
      {/* ✅ Hero Section */}
      <HeroSection locale={params.locale} dict={dict.home?.hero} />

      {/* ✅ Blog Section */}
      <BlogSection locale={params.locale} dict={dict.blog} />
    </main>
  );
}
