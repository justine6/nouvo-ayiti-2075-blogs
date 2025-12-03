import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type Props = { params: { locale: string } };

type VisionDict = {
  title?: string;
  intro?: string;
  points?: string[];
  metaTitle?: string;
  metaDescription?: string;
};

export default async function VisionPage({ params }: Props) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const dict = (await getDictionary(locale, "vision")) as VisionDict;

  const title = dict.title ?? "Our Vision";
  const intro =
    dict.intro ??
    "Our vision is to restore dignity, empower communities, and renew hope for Haiti's future.";
  const points = dict.points ?? [];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

      <p className="mt-4 text-gray-700">{intro}</p>

      {points.length > 0 && (
        <ul className="mt-6 space-y-3 text-gray-700">
          {points.map((p, i) => (
            <li key={i} className="leading-relaxed">
              • {p}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-sm text-gray-500">
        Locale: {locale.toUpperCase()}
      </p>
    </main>
  );
}
