import Link from "next/link";
import type { PostType } from "@/interfaces/post";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  posts: PostType[];
  locale: string;
  dict: Dictionary;
};

export default function MoreStories({ posts, locale, dict }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{dict.blog.moreStories}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/${locale}/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {dict.blog.readMore}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
