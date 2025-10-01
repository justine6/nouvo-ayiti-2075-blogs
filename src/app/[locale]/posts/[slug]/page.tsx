import type { SiteDictionary } from "@/lib/types";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/app/components/Container";
import MoreStories from "@/app/components/MoreStories";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/types";

type Props = {
  params: {
    slug?: string; // ✅ make optional
    locale?: Locale; // ✅ make optional
  };
};

export default async function PostPage({ params }: Props) {
  const locale: Locale = params?.locale || "en"; // ✅ fallback
  const slug = params?.slug;

  if (!slug) {
    return notFound(); // ✅ prevent "undefined" slug crash
  }

  // Load dictionary
  const dict: SiteDictionary = await getDictionary(params?.locale || "en");

  // Load posts for this locale
  let posts = getAllPosts(locale);
  let post = posts.find((p) => p.slug === slug);

  // Fallback to English if not found
  if (!post && locale !== "en") {
    posts = getAllPosts("en");
    post = posts.find((p) => p.slug === slug);
  }

  if (!post) {
    return notFound(); // ✅ clean 404 if post doesn’t exist
  }

  return (
    <Container>
      <article className="prose lg:prose-xl mx-auto p-8">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <MDXRemote source={post.content} />
      </article>

      {/* Back to Blog List */}
      <div className="text-center mt-12">
        <a
          href={`/${locale}/blog`}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {dict.blog.backToList}
        </a>
      </div>

      {/* More stories */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{dict.blog.moreStories}</h2>
        <MoreStories posts={posts.filter((p) => p.slug !== slug)} />
      </section>
    </Container>
  );
}
