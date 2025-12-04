import type { Metadata } from "next";
import BlogSection from "../../components/BlogSection";
import { getAllPosts } from "../../../lib/get-all-posts";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { normalizeLocale } from "../../../lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);

  const title = dict.blogSection?.title ?? "Ayiti 2075 Blog";
  const description =
    dict.blogSection?.subtitle ??
    "Stories and updates from the Nouvo Ayiti 2075 movement.";

  return {
    title,
    description,
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const posts = getAllPosts();
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white py-10">
      <BlogSection locale={locale} posts={posts} dictionary={dictionary} />
    </main>
  );
}
