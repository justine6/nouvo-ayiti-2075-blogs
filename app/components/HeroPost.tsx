import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/get-all-posts";

type HeroPostProps = {
  post: Post;
};

export function HeroPost({ post }: HeroPostProps) {
  return (
    <section className="my-8">
      <div className="relative w-full h-72 md:h-96">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-2xl shadow-md"
            priority
          />
        )}
      </div>
      <h3 className="mt-4 text-2xl md:text-3xl font-bold">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-600 text-sm mt-1">{post.date}</p>
      {post.excerpt && (
        <p className="mt-2 text-lg text-gray-700">{post.excerpt}</p>
      )}
    </section>
  );
}
