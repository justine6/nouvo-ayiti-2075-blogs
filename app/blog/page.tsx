import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import LogoBanner from "@/components/LogoBanner";
import BlogCard from "@/components/BlogCard";
import PageHeading from "@/components/PageHeading";
import PageSection from "@/components/PageSection";

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const posts = await getAllPosts(params.locale);
  const dict = await getDictionary(params.locale);

  return (
    <>
      <LogoBanner />
      <PageSection>
        <PageHeading>{dict.topbar.blog}</PageHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={params.locale} />
          ))}
        </div>
      </PageSection>
    </>
  );
}
