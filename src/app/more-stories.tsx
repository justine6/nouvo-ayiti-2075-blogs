import Link from "next/link";

type MoreStoriesProps = {
  slug: string;
  title: string;
};

const MoreStories = ({ slug, title }: MoreStoriesProps) => {
  return (
    <div className="mb-4">
      <Link href={`/posts/${slug}`} className="text-blue-600 hover:underline">
        {title}
      </Link>
    </div>
  );
};

export default MoreStories;
