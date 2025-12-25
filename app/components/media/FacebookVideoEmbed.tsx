type FacebookVideoEmbedProps = {
  url: string;
  title?: string;
  ariaLabel?: string;
};

export default function FacebookVideoEmbed({
  url,
  title = "Featured Video",
  ariaLabel = "Facebook video",
}: FacebookVideoEmbedProps) {
  const encoded = encodeURIComponent(url);
  const src = `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=1280`;

  return (
    <section aria-label={title} className="w-full">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

        <div className="mt-6 overflow-hidden rounded-2xl border bg-black shadow-lg ring-1 ring-black/5">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={src}
              title={ariaLabel}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          If the video doesn’t load, it may be restricted from embedding.{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-slate-900"
          >
            Watch on Facebook
          </a>
          .
        </p>
      </div>
    </section>
  );
}
