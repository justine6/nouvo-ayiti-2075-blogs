// app/[locale]/about/page.tsx

import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  locales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/settings";

type Props = {
  params: { locale: string };
};

type AboutDict = {
  title?: string;
  intro?: string;
  teamHeading?: string;
  teamIntro?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export default async function AboutPage({ params }: Props) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const dict = (await getDictionary(locale, "about")) as AboutDict;

  const title = dict.title ?? "About us";
  const intro =
    dict.intro ??
    "Nouvo Ayiti 2075 is a people-driven movement focused on restoring dignity, rebuilding hope, and renewing Haiti’s vision.";
  const teamHeading = dict.teamHeading ?? "Our Team";
  const teamIntro =
    dict.teamIntro ??
    "We are a collective of leaders, volunteers, and community members working together for a better future for Haiti.";

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

      <p className="mt-4 text-gray-700">{intro}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          {teamHeading}
        </h2>
        <p className="mt-3 text-gray-700">{teamIntro}</p>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        Locale: {locale.toUpperCase()}
      </p>
    </main>
  );
}
