// app/[locale]/blog/page.tsx

import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";
import BlogTopbar from "@/components/layout/BlogTopbar";
import PostsGrid from "@/components/blog/PostsGrid";

type BlogPageProps = {
  params: { locale: Locale };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = (params?.locale ?? "en") as Locale;

  const dict = (await getDictionary(locale, "blogPage")) as any;

  const blogDict =
    (dict?.blogSection as any) ?? {
      title: "Ayiti 2075 Blog",
      paragraph: "Stories, updates, and visions for the future.",
      readMore: "Read More",
    };

  const posts = await getAllPosts(locale);

  return (
    <div className="na-blog-page">
      <BlogTopbar locale={locale} />

      <main className="na-blog-main">
        <header className="na-blog-header">
          <h1 className="na-blog-title">{blogDict.title}</h1>
          <p className="na-blog-subtitle">{blogDict.paragraph}</p>
        </header>
        <PostsGrid posts={posts} locale={locale} readMoreLabel={blogDict.readMore} />
        <PostsGrid posts={posts} locale={locale} />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "fr", "ht", "es"];
  return locales.map((locale) => ({ locale }));
}
