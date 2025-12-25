import type { Locale } from "./settings";

export type VideosDictionary = {
  metaTitle?: string;
  metaDescription?: string;
  title?: string;
  intro?: string;
  description?: string;
  backToHome?: string;
  youtubePlaylistUrl?: string;
  youtubePlaylistLabel?: string;
  viewModeCards?: string;
  viewModeGrid?: string;
  tabYoutube?: string;
  tabFacebook?: string;
  openInNewTab?: string;
  watchOnYoutube?: string;
  watchOnFacebook?: string;
  ariaTabListLabel?: string;
  ariaTabPanelLabel?: string;
  items?: Record<
    string,
    {
      title?: string;
      subtitle?: string;
      description?: string;
    }
  >;
};

export async function getVideosDictionary(
  locale: Locale,
): Promise<VideosDictionary> {
  // 🚩 IMPORTANT: use a relative path, not "@/..."
  // File layout: content/dictionaries/<locale>/videos.json
  const mod = await import(
    `../../content/dictionaries/${locale}/videos.json`
  );

  // Next JS JSON modules expose data on `.default`
  return (mod as { default: VideosDictionary }).default;
}
