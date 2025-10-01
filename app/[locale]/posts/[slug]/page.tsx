import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";
import type { SiteDictionary } from "@/lib/types";

type Props = {
  params: { locale?: Locale; slug: string };
};

export default async function PostPage({ params }: Props) {
  const dict: SiteDictionary = await getDictionary(params?.locale || "en");

  return (
    <article>
      <h1>{dict.posts?.title}</h1>
      <p>Post slug: {params.slug}</p>
    </article>
  );
}
