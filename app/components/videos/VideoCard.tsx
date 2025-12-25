"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import type { VideoEntry } from "@/lib/videos/catalog";

type Platform = "youtube" | "facebook";

type VideoCardProps = {
  locale: string;
  dict: {
    tabYoutube?: string;
    tabFacebook?: string;
    watchOnYoutube?: string;
    watchOnFacebook?: string;
    ariaTabListLabel?: string;
    ariaTabPanelLabel?: string;
  };
  video: VideoEntry;
  copy: {
    title: string;
    subtitle?: string;
    description?: string;
  };
};

function hasYoutube(v: VideoEntry) {
  return Boolean(v.youtubeEmbed || v.youtubeWatch);
}

function hasFacebook(v: VideoEntry) {
  return Boolean(v.facebookEmbed || v.facebookPost);
}

export default function VideoCard({
  locale,
  dict,
  video,
  copy,
}: VideoCardProps) {
  const youtubeOk = hasYoutube(video);
  const facebookOk = hasFacebook(video);

  const initial: Platform = youtubeOk ? "youtube" : "facebook";
  const [active, setActive] = useState<Platform>(initial);

  const tabs: Platform[] = useMemo(() => {
    const t: Platform[] = [];
    if (youtubeOk) t.push("youtube");
    if (facebookOk) t.push("facebook");
    return t;
  }, [youtubeOk, facebookOk]);

  const tabId = (p: Platform) => `tab-${video.id}-${p}`;
  const panelId = (p: Platform) => `panel-${video.id}-${p}`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (tabs.length <= 1) return;

    const go = (nextIdx: number) => {
      const next = tabs[nextIdx];
      setActive(next);
      document.getElementById(tabId(next))?.focus();
    };

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        go((idx + 1) % tabs.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        go((idx - 1 + tabs.length) % tabs.length);
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(tabs.length - 1);
        break;
    }
  };

  return (
    <section
      data-locale={locale}
      className="na-videos-card mx-auto w-full max-w-4xl"
    >
      {/* Text copy */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{copy.title}</h2>
        {copy.subtitle ? (
          <p className="text-sm text-slate-600">{copy.subtitle}</p>
        ) : null}
        {copy.description ? (
          <p className="text-sm text-slate-600">{copy.description}</p>
        ) : null}
      </div>

      {/* Tabs (only if both platforms exist) */}
      {tabs.length > 1 ? (
        <div className="mt-4">
          <div
            role="tablist"
            aria-label={dict.ariaTabListLabel || "Choose a platform"}
            className="inline-flex rounded-full bg-slate-100 p-1 shadow-inner"
          >
            {tabs.map((p, idx) => {
              const selected = active === p;
              const label = p === "youtube" ? dict.tabYoutube : dict.tabFacebook;

              return (
                <button
                  key={p}
                  id={tabId(p)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId(p)}
                  tabIndex={selected ? 0 : -1}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  onClick={() => setActive(p)}
                  className={[
                    "px-3 py-1.5 text-sm font-semibold rounded-full transition",
                    selected
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-700 hover:text-slate-900",
                  ].join(" ")}
                >
                  {label || (p === "youtube" ? "YouTube" : "Facebook")}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Player */}
      <div className="mt-4 space-y-4">
        {/* YouTube panel */}
        {youtubeOk ? (
          <div
            id={panelId("youtube")}
            role="tabpanel"
            aria-label={dict.ariaTabPanelLabel || "Video player"}
            aria-labelledby={tabId("youtube")}
            hidden={tabs.length > 1 ? active !== "youtube" : false}
            className="space-y-3"
          >
            {video.youtubeEmbed && (
              <div className="flex justify-center">
                <div className="na-video-frame w-full max-w-4xl aspect-video">
                  <iframe
                    src={video.youtubeEmbed}
                    title={copy.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {video.youtubeWatch && (
              <a
                href={video.youtubeWatch}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm font-semibold text-red-600 hover:underline"
              >
                {dict.watchOnYoutube || "Watch on YouTube →"}
              </a>
            )}
          </div>
        ) : null}

        {/* Facebook panel */}
        {facebookOk ? (
          <div
            id={panelId("facebook")}
            role="tabpanel"
            aria-label={dict.ariaTabPanelLabel || "Video player"}
            aria-labelledby={tabId("facebook")}
            hidden={tabs.length > 1 ? active !== "facebook" : false}
            className="space-y-3"
          >
            {video.facebookEmbed && (
              <div className="flex justify-center">
                <div className="na-video-frame w-full max-w-4xl aspect-video">
                  <iframe
                    src={video.facebookEmbed}
                    title={copy.title}
                    className="h-full w-full"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {video.facebookPost && (
              <a
                href={video.facebookPost}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm font-semibold text-blue-600 hover:underline"
              >
                {dict.watchOnFacebook || "Watch on Facebook →"}
              </a>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
