import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function blogPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.blog?.title ?? "Blog"}</h1>
      <p>{dict.blog?.intro ?? "Read our latest posts"}</p>
    </section>
  );
}
