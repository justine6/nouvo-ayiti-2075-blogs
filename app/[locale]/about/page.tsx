// ✅ Safe locale fallback applied
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";
import type { SiteDictionary } from "@/lib/types";

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params }: Props) {
  const locale = params?.locale || "en"; // ✅ ensures no undefined
  const dict: SiteDictionary = await getDictionary(params?.locale || "en");

  return (
    <div>
      <h1>{dict.about?.title}</h1>
      <p>{dict.about?.intro}</p>
    </div>
  );
}
