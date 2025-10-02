import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function contactPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.contact?.title ?? "Contact"}</h1>
      <p>{dict.contact?.description ?? "Get in touch with us"}</p>
    </section>
  );
}
