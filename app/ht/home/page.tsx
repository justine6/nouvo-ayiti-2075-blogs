import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function homePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.home?.title ?? "Home"}</h1>
      <p>{dict.home?.subtitle ?? "Welcome to our site"}</p>
    </section>
  );
}
