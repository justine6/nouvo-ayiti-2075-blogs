import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function aboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.about?.title ?? "About Us"}</h1>
      <p>{dict.about?.content ?? "Learn more about our mission"}</p>
    </section>
  );
}
