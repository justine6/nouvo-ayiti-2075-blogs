import { getAllPostSlugs, getPostBySlug } from "@/lib/get-all-posts";
import { normalizeLocale, type Locale } from "@/lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return ["en", "fr", "ht", "es"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const locale: Locale = normalizeLocale(params.locale);
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white py-12">
        <section className="mx-auto max-w-3xl px-4">
          <p className="text-sm text-slate-500">Post not found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <section className="mx-auto max-w-3xl px-4">
        <p className="text-xs text-slate-500 mb-2">
          {new Date(post.date).toLocaleDateString(
            locale === "ht" ? "en-US" : locale,
            { year: "numeric", month: "short", day: "numeric" },
          )}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>
        <article className="prose max-w-none whitespace-pre-line">
          {post.content}
        </article>
      </section>
    </main>
  );
}
