import { getAllPosts } from "@/lib/get-all-posts";
import BlogPage from "@/app/blog/BlogPage";

type Props = {
  params: { locale: string };
};

export default function BlogIndexPage({ params }: Props) {
  const { locale } = params;

  // Load posts in current locale
  let allPosts = getAllPosts(locale);

  // Fallback to English if no localized posts
  if (!allPosts.length && locale !== "en") {
    allPosts = getAllPosts("en");
  }

  return <BlogPage allPosts={allPosts} />;
}
