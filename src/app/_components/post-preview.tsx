'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { PostType } from '@/interfaces/post';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostType) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">
        <Link href={`/posts/${slug}`}>
          <a>
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              width={600}
              height={400}
              className="rounded-t-md object-cover w-full h-auto"
            />
          </a>
        </Link>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:underline">
          <Link href={`/posts/${slug}`}>
            <a>{title}</a>
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{excerpt}</p>
        <div className="mt-4 text-sm italic text-gray-600 dark:text-gray-400">
          By {author.name}
        </div>
      </div>
    </div>
  );
}
