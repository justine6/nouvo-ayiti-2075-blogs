import Image from 'next/image';
import Link from 'next/link';

type PostProps = {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  slug: string;
  tags?: string[];
  onTagClick?: (tag: string) => void;
};

const BlogCard = ({
  title,
  date,
  excerpt,
  coverImage,
  author,
  slug,
  tags,
  onTagClick,
}: PostProps) => {
  const imageSrc = coverImage || '/images/blog/default-cover.jpg';

  return (
    <div className="mb-8">
      <Link href={`/posts/${slug}`} className="group block">
        <div className="relative h-48 w-full overflow-hidden rounded-md shadow-md">
          <Image
            src={imageSrc}
            alt={`Cover image for ${title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="mt-2 text-gray-700">{excerpt}</p>
        {author && <p className="mt-1 text-sm italic">By {author}</p>}
      </Link>

      {/* ✅ Optional: render tags */}
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
