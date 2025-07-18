import Image from 'next/image';
import Link from 'next/link';
import type { PostType } from '@/interfaces/post';

type BlogCardProps = PostType & {
  onTagClick?: (tag: string) => void;
};

export default function BlogCard({
  title,
  slug,
  excerpt,
  date,
  coverImage = '/images/blog/default-cover.jpg',
  author = { name: 'Editor', picture: '/images/blog/default-author.jpg' },
  tags = [],
  onTagClick,
}: BlogCardProps) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/posts/${slug}`}>
        <a className="block group">
          {/* Cover Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-t-md">
            <Image
              src={coverImage}
              alt={`Cover image for ${title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:underline">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{date}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{excerpt}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault();
                      onTagClick?.(tag);
                    }}
                    aria-label={`Filter blog posts by tag: ${tag}`}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full hover:scale-105 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Author */}
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Image
                src={author.picture}
                alt={author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>By {author.name}</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
