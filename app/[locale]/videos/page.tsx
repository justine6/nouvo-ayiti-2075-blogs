import { getDictionary } from "@/lib/i18n/get-dictionary";

const supportedLocales = ["en", "fr", "ht", "es"] as const;
type Locale = (typeof supportedLocales)[number];

type VideosPageProps = {
  params: { locale: string };
};

export default async function VideosPage({ params }: VideosPageProps) {
  const rawLocale = params.locale;
  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en";

  // Loosen typing here so we can safely ask for "videos"
  const videosDict: any = await (getDictionary as any)(locale, "videos");

  const heading: string =
    videosDict?.title ?? "Vision & Project Videos";

  const subtitle: string =
    videosDict?.subtitle ??
    "Watch key messages, testimonies, and project updates supporting Nouvo Ayiti 2075.";

  return (
    <main className="na-page">
      <section className="na-page-hero">
        <h1 className="na-page-title">{heading}</h1>
        <p className="na-page-lead">{subtitle}</p>
      </section>

      <section className="na-section">
        <p>
          Video content will appear here. For now, this page is ready for
          deployment and can be wired to real videos later.
        </p>
      </section>
    </main>
  );
}
