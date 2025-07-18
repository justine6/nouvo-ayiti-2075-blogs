import Image from 'next/image';
import Link from 'next/link';

type PostProps = {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  slug: string;
};

const BlogCard = ({ title, date, excerpt, coverImage, author, slug }: PostProps) => {
  const imageSrc = coverImage || '/images/blog/default-cover.jpg';

  return (
    <div className="mb-8">
      <Link href={`/posts/${slug}`}>
        <a className="group block">
          <div className="relative h-48 w-full overflow-hidden rounded-md shadow-md">
            <Image
              src={imageSrc}
              alt={`Cover image for ${title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="mt-2 text-gray-700">{excerpt}</p>
          {author && <p className="mt-1 text-sm italic">By {author}</p>}
        </a>
      </Link>
    </div>
  );
};

export default BlogCard;
