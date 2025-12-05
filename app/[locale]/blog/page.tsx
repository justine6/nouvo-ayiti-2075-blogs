// app/[locale]/blog/page.tsx
import { getAllPosts, type Post } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale, type Locale } from "@/lib/i18n/settings";
import PostsGrid from "@/components/blog/PostsGrid";

type PageProps = {
  params: { locale: string };
};

export default async function BlogIndexPage({ params }: PageProps) {
  const locale: Locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);
  const labels = dict.blogSection ?? {};

  const posts: Post[] = getAllPosts();

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {labels.title ?? "Our Blog"}
          </h1>

          <p className="mt-2 text-neutral-600">
            {labels.subtitle ?? "Stories, updates, and visions for the future."}
          </p>
        </header>

        {/* 🔥 Unified polished UI using same grid/cards as homepage */}
        <PostsGrid locale={locale} posts={posts} variant="blog" />
      </div>
    </main>
  );
}
