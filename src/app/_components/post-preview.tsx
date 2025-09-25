import Image from "next/image";
import Link from "next/link";

type PostPreviewProps = {
  slug: string;
  title: string;
  coverImage?: string;
};

const PostPreview = ({ slug, title, coverImage }: PostPreviewProps) => {
  const imageSrc = coverImage || "/images/blog/default-cover.jpg";

  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link href={`/posts/${slug}`} className="block">
        <Image
          src={imageSrc}
          alt={`Cover image for ${title}`}
          width={600}
          height={400}
          className="rounded-t-md object-cover w-full h-auto"
        />
      </Link>
      <div className="p-4">
        <Link
          href={`/posts/${slug}`}
          className="text-lg font-semibold hover:underline"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default PostPreview;





