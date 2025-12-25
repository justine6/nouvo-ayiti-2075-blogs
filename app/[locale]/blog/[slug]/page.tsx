// app/[locale]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, type Post } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/settings";

type PageParams = {
  locale: string;
  slug: string;
};

type PageProps = {
  params: PageParams;
};

function findPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

// -------- generateStaticParams --------
export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: PageParams[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

// -------- generateMetadata --------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale as Locale);
  const post = findPostBySlug(params.slug);

  const baseTitle = dict?.blog?.metaTitle ?? "Nouvo Ayiti 2075 — Blog";

  if (!post) {
    return {
      title: dict?.blog?.notFoundTitle ?? "Post not found",
      description:
        dict?.blog?.notFoundDescription ??
        "The requested post could not be found.",
    };
  }

  return {
    title: post.title
      ? `${post.title} | ${baseTitle}`
      : baseTitle,
    description:
      post.excerpt ??
      dict?.blog?.metaDescription ??
      "Stories from the Nouvo Ayiti 2075 journey.",
  };
}

// -------- Page component --------
export default async function BlogPostPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const post = findPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate =
    post.date && post.date.trim().length > 0
      ? new Date(post.date).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const html =
    (post as any).contentHtml ??
    (post as any).content ??
    "";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="space-y-6">
        <header className="space-y-3">
          {formattedDate && (
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {formattedDate}
            </p>
          )}
          <h1 className="text-3xl font-bold text-slate-900">
            {post.title}
          </h1>
        </header>

        {post.coverImage && (
          <div className="relative mt-4 h-64 w-full overflow-hidden rounded-xl">
            <img
              src={post.coverImage}
              alt={post.title ?? ""}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <section
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-8 border-t border-slate-200 pt-4 text-sm text-slate-600">
          <a
            href={`/${locale}/blog`}
            className="text-blue-700 hover:underline"
          >
            ← {dict?.blog?.backToListLabel ?? "Back to all posts"}
          </a>
        </footer>
      </article>
    </main>
  );
}
