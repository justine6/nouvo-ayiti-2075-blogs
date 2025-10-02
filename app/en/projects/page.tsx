import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

export default async function projectsPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <section>
      <h1>{dict.projects?.title ?? "Projects"}</h1>
      <p>{dict.projects?.motto ?? "Building a better future"}</p>
    </section>
  );
}
