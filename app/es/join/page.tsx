import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function joinPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.join?.title ?? "Join Us"}</h1>
      <p>{dict.join?.form?.description ?? "Become part of the movement"}</p>
    </section>
  );
}
