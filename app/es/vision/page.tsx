import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function visionPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.vision?.title ?? "Our Vision"}</h1>
      <p>{dict.vision?.intro ?? "See what drives us"}</p>
    </section>
  );
}
