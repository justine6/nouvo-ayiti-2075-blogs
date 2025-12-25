import Link from "next/link";
import type { Metadata } from "next";
import { VIDEO_CATALOG } from "@/lib/videos/catalog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale, type Locale } from "@/lib/i18n/settings";
import VideosClient from "@/components/videos/VideosClient";

type PageProps = {
  params: {
    locale: string;
  };
};

type VideosDict = {
  metaTitle?: string;
  metaDescription?: string;
  title?: string;
  intro?: string;
  description?: string;
  backToHome?: string;
  youtubePlaylistUrl?: string;
  youtubePlaylistLabel?: string;
};

type VideosDictWithExtras = VideosDict & Record<string, unknown>;

async function getVideosDict(rawLocale: string): Promise<VideosDictWithExtras> {
  const locale = normalizeLocale(rawLocale) as Locale;

  const dict = (await getDictionary(locale)) as {
    pages?: { videos?: VideosDictWithExtras };
    videos?: VideosDictWithExtras;
  };

  const videosDict: VideosDictWithExtras =
    dict.pages?.videos ?? dict.videos ?? ({} as VideosDictWithExtras);

  return videosDict;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const videosDict = await getVideosDict(params.locale);

  return {
    title: videosDict.metaTitle || "Vision Videos",
    description:
      videosDict.metaDescription ||
      videosDict.description ||
      "Watch videos from the Nouvo Ayiti 2075 movement.",
  };
}

export default async function VideosPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const videosDict = await getVideosDict(params.locale);

  return (
    <main className="na-videos-page">
      <div className="na-videos-page-inner space-y-10">
        <header className="space-y-3 max-w-3xl mx-auto text-center">
          <p className="text-sm">
            <Link
              href={`/${locale}`}
              className="text-xs text-slate-100/80 hover:underline"
            >
              ← {videosDict.backToHome || "Back to Home"}
            </Link>
          </p>

          <h1 className="text-2xl font-bold text-slate-50">
            {videosDict.title || "Vision Videos"}
          </h1>

          {videosDict.description ? (
            <p className="max-w-3xl text-sm text-slate-100/90 mx-auto">
              {videosDict.description}
            </p>
          ) : null}

          {videosDict.youtubePlaylistUrl ? (
            <div className="pt-2">
              <a
                href={videosDict.youtubePlaylistUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-red-400/70 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-100 hover:bg-red-500/20"
              >
                {videosDict.youtubePlaylistLabel || "Open YouTube playlist"}
              </a>
            </div>
          ) : null}
        </header>

        {/* Video cards */}
        <div className="space-y-8">
          <VideosClient
            locale={locale}
            dict={videosDict}
            videos={VIDEO_CATALOG}
          />
        </div>
      </div>
    </main>
  );
}
