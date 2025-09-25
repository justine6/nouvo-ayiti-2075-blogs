import Link from "next/link";
import Image from "next/image";
import type { PostType } from "@/interfaces/post";

type BlogCardProps = {
  post: PostType;
  locale: string;
  dict: any; // ✅ ideally type this with your BlogDictionary
};

export default function BlogCard({ post, locale, dict }: BlogCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-2">{post.excerpt}</p>

        {post.tags && (
          <p className="text-sm text-blue-600 mb-2">{post.tags.join(", ")}</p>
        )}

        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="text-blue-600 hover:underline"
        >
          {dict.blog.readMore}
        </Link>
      </div>
    </div>
  );
}
