// components/media/VideoEmbed.tsx

type VideoEmbedProps = {
  /** Human-readable video title for accessibility */
  title: string;
  /** Embed URL (e.g. YouTube or Facebook iframe src) */
  src: string;
};

export default function VideoEmbed({ title, src }: VideoEmbedProps) {
  return (
    <div className="na-video-frame">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
