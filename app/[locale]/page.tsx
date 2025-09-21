import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/types";

type Props = {
  params: { locale: Locale };
};

export default async function LocaleHomePage({ params }: Props) {
  const dict = await getDictionary(params.locale);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{dict.home?.title ?? "Welcome"}</h1>
      <p className="mt-2 text-gray-600">
        {dict.home?.subtitle ?? "Localized homepage is working!"}
      </p>
    </main>
  );
}
