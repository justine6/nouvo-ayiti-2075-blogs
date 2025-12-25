// app/[locale]/blog/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/settings";
import PostCard from "../../components/blog/PostCard";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);

  return {
    title: dict?.blog?.metaTitle ?? "Nouvo Ayiti 2075 — Blog",
    description:
      dict?.blog?.metaDescription ??
      "Stories, progress updates, and reflections from the Nouvo Ayiti 2075 journey.",
  };
}

export default async function BlogPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const posts = getAllPosts();

  const heading = dict?.blog?.title ?? "Blog";
  const intro =
    dict?.blog?.intro ??
    "Stories, progress updates, and reflections for the future.";
  const readMoreLabel =
    dict?.blog?.readMore ?? "Read the vision";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {heading}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{intro}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            locale={locale as Locale}
            post={post}
            readMoreLabel={readMoreLabel}
            variant="blog"
          />
        ))}
      </section>
    </main>
  );
}
