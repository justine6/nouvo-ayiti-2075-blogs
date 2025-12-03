// app/[locale]/page.tsx

import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

import { getAllPosts } from "@/lib/get-all-posts";

import HeroSection from "@/components/blog/HeroSection";
import BlogSection from "@/components/blog/BlogSection";
import Footer from "@/components/blog/Footer";

type HomePageProps = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: HomePageProps) {
  const locale = params.locale || "en";

  // Load home translations
  const dict = await getDictionary(locale, "home");

  // Load all blog posts
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* HERO */}
      <HeroSection locale={locale} dictionary={dict} />

      {/* BLOG SECTION */}
      <div className="mt-12">
        <BlogSection locale={locale} posts={posts} dictionary={dict} />
      </div>

      {/* FOOTER */}
      <Footer locale={locale} dictionary={dict} />
    </main>
  );
}
