export type VideoFormat = "standard" | "short";
export type VideoPlatform = "youtube" | "facebook";

export type VideoEntry = {
  id: string; // stable key used in JSON dictionaries
  format?: VideoFormat;

  // ✅ Default copy (used when dictionary doesn't provide overrides)
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultDescription?: string;

  youtubeEmbed?: string;
  youtubeWatch?: string;

  facebookEmbed?: string;
  facebookPost?: string;
};

export const VIDEO_CATALOG: VideoEntry[] = [
  {
    id: "kiawel-1",
    format: "standard",
    defaultTitle: "Nouvo Ayiti 2075 — Featured Video",
    defaultSubtitle: "A message to unite and rebuild",
    defaultDescription:
      "Watch the featured message and share it with your community.",
    youtubeEmbed: "https://www.youtube.com/embed/brCFRyzM90s",
    youtubeWatch: "https://youtu.be/brCFRyzM90s",
    facebookEmbed:
      "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/4272625979686034&show_text=false&width=1280",
    facebookPost: "https://www.facebook.com/reel/4272625979686034",
  },
  {
    id: "kiawel-2",
    format: "standard",
    defaultTitle: "Message to the Haitian People",
    defaultSubtitle: "A call to hope and action",
    defaultDescription: "",
    youtubeEmbed: "https://www.youtube.com/embed/VIDEO_ID_2",
    youtubeWatch: "https://youtu.be/VIDEO_ID_2",
  },
];
