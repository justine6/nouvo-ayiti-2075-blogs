"use client";

import { useState } from "react";
import type { VideoEntry } from "@/lib/videos/catalog";
import VideoCard from "./VideoCard";

type ViewMode = "cards" | "shorts";

type VideosClientProps = {
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  videos: VideoEntry[];
};

export default function VideosClient({
  locale,
  dict,
  videos,
}: VideosClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const items =
    (dict?.items as
      | Record<
          string,
          { title?: string; subtitle?: string; description?: string }
        >
      | undefined) ?? {};

  const labelCards = dict?.viewModeCards || "Cards";
  const labelShorts = dict?.viewModeGrid || "Shorts/Reels";

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span>View:</span>
        <button
          type="button"
          onClick={() => setViewMode("cards")}
          className={[
            "rounded-full px-3 py-1",
            viewMode === "cards"
              ? "bg-slate-900 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50",
          ].join(" ")}
        >
          {labelCards}
        </button>
        <button
          type="button"
          onClick={() => setViewMode("shorts")}
          className={[
            "rounded-full px-3 py-1",
            viewMode === "shorts"
              ? "bg-slate-900 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50",
          ].join(" ")}
        >
          {labelShorts}
        </button>
      </div>

      <div className="space-y-8">
        {videos.map((video) => {
          const meta = items[video.id] || {};

          const title =
            meta.title ||
            video.defaultTitle || // ✅ friendly fallback
            video.id; // last-resort debug fallback

          const subtitle = meta.subtitle ?? video.defaultSubtitle;
          const description =
            meta.description ?? video.defaultDescription ?? "";

          return (
            <VideoCard
              key={video.id}
              locale={locale}
              dict={dict}
              video={video}
              copy={{ title, subtitle, description }}
            />
          );
        })}
      </div>

    </section>
  );
}
