"use client";

import { useMemo, useState } from "react";

type Props = {
  title?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
};

function parseYouTube(input: string) {
  try {
    const url = new URL(input);

    const list = url.searchParams.get("list");
    const v = url.searchParams.get("v");

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      if (list) return { kind: "playlist" as const, id: list };
      return { kind: "video" as const, id };
    }

    if (url.hostname.includes("youtube.com")) {
      if (list && !v) return { kind: "playlist" as const, id: list };
      if (v) return { kind: "video" as const, id: v };

      const parts = url.pathname.split("/").filter(Boolean);
      const maybe = parts[1] && (parts[0] === "shorts" || parts[0] === "embed");
      if (maybe) return { kind: "video" as const, id: parts[1] };
    }
  } catch {}
  return null;
}

function youtubeEmbedSrc(url: string) {
  const parsed = parseYouTube(url);
  if (!parsed) return null;

  if (parsed.kind === "playlist") {
    return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(
      parsed.id
    )}`;
  }

  return `https://www.youtube.com/embed/${encodeURIComponent(parsed.id)}`;
}

function facebookEmbedSrc(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=1280`;
}

export default function VideoEmbed({
  title = "Featured Video",
  youtubeUrl,
  facebookUrl,
}: Props) {
  const providers = useMemo(() => {
    const list: Array<"youtube" | "facebook"> = [];
    if (youtubeUrl) list.push("youtube");
    if (facebookUrl) list.push("facebook");
    return list;
  }, [youtubeUrl, facebookUrl]);

  const [active, setActive] = useState<"youtube" | "facebook">(
    providers[0] ?? "youtube"
  );

  const src =
    active === "youtube" && youtubeUrl
      ? youtubeEmbedSrc(youtubeUrl)
      : active === "facebook" && facebookUrl
      ? facebookEmbedSrc(facebookUrl)
      : null;

  return (
    <section aria-label={title} className="w-full">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

        <div className="mt-4 flex justify-center gap-2">
          {youtubeUrl && (
            <button
              type="button"
              onClick={() => setActive("youtube")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                active === "youtube"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              YouTube
            </button>
          )}
          {facebookUrl && (
            <button
              type="button"
              onClick={() => setActive("facebook")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                active === "facebook"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              Facebook
            </button>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-black/10">
          <div className="relative aspect-video w-full">
            {src ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={src}
                title={title}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/80">
                No embed source provided.
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-slate-900"
            >
              Watch on YouTube
            </a>
          )}
          {youtubeUrl && facebookUrl && <span> · </span>}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-slate-900"
            >
              Watch on Facebook
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
