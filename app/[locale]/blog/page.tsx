import type { Metadata } from "next";
import PostsGrid from "@/components/blog/PostsGrid";
import { getAllPosts } from "@/lib/get-all-posts";
import { SUPPORTED_LOCALES, normalizeLocale } from "@/lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: "Blog – Nouvo Ayiti 2075",
  };
}

export default async function BlogPage({ params }: PageProps) {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-10">
      <PostsGrid locale={normalizeLocale(params.locale)} posts={posts} />
    </main>
  );
}
