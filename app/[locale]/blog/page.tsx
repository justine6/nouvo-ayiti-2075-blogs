import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

import BlogSection from "@/components/BlogSection";

type Props = {
  params: { locale: Locale };
};

export default async function BlogPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return (
    <div>
      <BlogSection dict={dict.blog} />
    </div>
  );
}
