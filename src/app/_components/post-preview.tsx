import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <Link href={`/posts/${slug}`}>
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </Link>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-sm mb-2 text-gray-500">{date}</div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="text-sm italic">By {author.name}</div>
    </div>
  );
}
