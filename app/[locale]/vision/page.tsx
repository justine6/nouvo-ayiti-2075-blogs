import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

type VisionDict = {
  metaTitle?: string;
  metaDescription?: string;
  title?: string;
  intro?: string;
  points?: string[];
};

async function getVisionDict(locale: Locale): Promise<VisionDict> {
  const dict = await getDictionary(locale as Locale);

  // If your dictionaries are nested, eg:
  // {
  //   "pages": { "vision": { ... } }
  // }
  // this will pick that first; otherwise it falls back to dict.vision.
  const visionDict =
    (dict.pages && (dict.pages as any).vision) ||
    (dict.vision as any) ||
    {};

  return visionDict as VisionDict;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const dict = await getVisionDict(locale);

  return {
    title: dict.metaTitle || dict.title || "Our Vision",
    description:
      dict.metaDescription ||
      dict.intro ||
      "Our vision is to restore dignity, empower communities, and renew hope for Haiti's future.",
  };
}

export default async function VisionPage({ params }: PageProps) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const dict = await getVisionDict(locale);

  const title =
    dict.title ?? "Our Vision";
  const intro =
    dict.intro ??
    "Our vision is to restore dignity, empower communities, and renew hope for Haiti's future.";
  const points = dict.points ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-slate-700">{intro}</p>
      </header>

      {points.length > 0 && (
        <ul className="mt-4 space-y-3 text-slate-700">
          {points.map((p, i) => (
            <li key={i} className="leading-relaxed">
              • {p}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-xs text-slate-400">
        Locale: {locale.toUpperCase()}
      </p>
    </main>
  );
}
