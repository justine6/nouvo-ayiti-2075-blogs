import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import HeroSection from "@/components/HeroSection";
import Container from "@/components/Container";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return (
    <main>
      {/* ✅ Hero with map + locale-aware main site link */}
      <HeroSection locale={locale} />

      <Container>
        {/* ✅ Blog site doesn’t need ProjectsSection or NewsletterSection */}
        <p className="text-center text-gray-500 mt-8">
          {dict.blog?.welcome || "Welcome to the Nouvo Ayiti 2075 blog."}
        </p>
      </Container>
    </main>
  );
}
