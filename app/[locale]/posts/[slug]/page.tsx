import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";

type Props = {
  params: { slug: string; locale: Locale };
};

export default async function PostPage({ params }: Props) {
  const { slug, locale } = params;

  // Load dictionary + posts
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);

  // Find the post by slug
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Post title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Post content */}
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Navigation */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        <a href={`/${locale}`} className="hover:underline mb-4 sm:mb-0">
          {dict.backToList || "← Back to all posts"}
        </a>

        <a href={`/${locale}/#more`} className="hover:underline">
          {dict.moreStories || "More stories"}
        </a>
      </div>
    </div>
  );
}
