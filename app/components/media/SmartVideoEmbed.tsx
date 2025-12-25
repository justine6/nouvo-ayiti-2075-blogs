type SmartVideoEmbedProps = {
  youtubeUrl?: string;
  facebookUrl?: string;
  title?: string;
  ariaLabel?: string;
};

function getYouTubeEmbedUrl(url: string) {
  // Supports youtu.be + youtube.com/watch
  const idMatch =
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/[?&]v=([^&]+)/);

  return idMatch
    ? `https://www.youtube.com/embed/${idMatch[1]}`
    : null;
}

export default function SmartVideoEmbed({
  youtubeUrl,
  facebookUrl,
  title = "Featured Video",
  ariaLabel = "Embedded video",
}: SmartVideoEmbedProps) {
  const ytEmbed =
    youtubeUrl ? getYouTubeEmbedUrl(youtubeUrl) : null;

  return (
    <section aria-label={title} className="w-full">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>

        {/* Provider pills */}
        <div className="mt-4 flex justify-center gap-2 text-xs">
          {youtubeUrl && (
            <span className="rounded-full border px-2 py-0.5">
              YouTube
            </span>
          )}
          {facebookUrl && (
            <span className="rounded-full border px-2 py-0.5">
              Facebook
            </span>
          )}
        </div>

        {/* VIDEO */}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-black shadow-lg">
          <div className="relative aspect-video w-full">
            {ytEmbed ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={ytEmbed}
                title={ariaLabel}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : facebookUrl ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                  facebookUrl,
                )}&show_text=false`}
                title={ariaLabel}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white text-sm">
                Video unavailable
              </div>
            )}
          </div>
        </div>

        {/* Fallback links */}
        <p className="mt-4 text-sm text-slate-600">
          {youtubeUrl && (
            <>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-slate-900"
              >
                Watch on YouTube
              </a>
            </>
          )}
          {youtubeUrl && facebookUrl && " · "}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-slate-900"
            >
              Watch on Facebook
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
