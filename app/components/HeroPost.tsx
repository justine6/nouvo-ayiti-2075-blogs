import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/get-all-posts";

type HeroPostProps = {
  post: Post;
  locale: string;
  readMoreLabel: string;
};

export default function HeroPost({
  post,
  locale,
  readMoreLabel,
}: HeroPostProps) {
  // ✅ Default to logo if no coverImage provided
  const coverImage = post.coverImage || "/images/nouvoayiti2075-logo.png";

  return (
    <section className="my-8">
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={coverImage}
          alt={post.title || "Nouvo Ayiti 2075"}
          fill
          className="object-contain rounded-2xl shadow-md bg-white"
          priority
        />
      </div>

      <h3 className="mt-4 text-2xl md:text-3xl font-bold">
        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="hover:underline"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-gray-600 text-sm mt-1">{post.date}</p>

      {post.excerpt && (
        <p className="mt-2 text-lg text-gray-700">{post.excerpt}</p>
      )}

      <Link
        href={`/${locale}/posts/${post.slug}`}
        className="text-blue-600 hover:underline mt-3 inline-block"
      >
        {readMoreLabel}
      </Link>
    </section>
  );
}
