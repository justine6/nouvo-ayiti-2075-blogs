// app/components/MoreStories.tsx
import PostCard from "./PostCard";

type MoreStoriesProps = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};

export default function MoreStories(props: MoreStoriesProps) {
  return <PostCard {...props} variant="more" />;
}
