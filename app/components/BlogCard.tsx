// app/components/BlogCard.tsx
import PostCard from "./PostCard";

type BlogCardProps = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};

export default function BlogCard(props: BlogCardProps) {
  return <PostCard {...props} variant="blog" />;
}
