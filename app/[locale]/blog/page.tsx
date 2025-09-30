import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import PageSection from "@/components/PageSection";
import PageHeading from "@/components/PageHeading";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, type Post } from "@/lib/get-all-posts";

type Props = {
  params: { locale: Locale };
};

export default async function BlogPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  // Explicitly type posts
  let posts: Post[] = getAllPosts(locale);
  if (!posts || posts.length === 0) {
    posts = getAllPosts("en");
  }

  return (
    <PageSection>
      <PageHeading>{dict.blog?.title || "Blog"}</PageHeading>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">{dict.blog?.noPosts || "No posts available."}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readMoreLabel={dict.blog?.readMore || "Read More"}
            />
          ))}
        </div>
      )}
    </PageSection>
  );
}
