HeroSection


// app/components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  locale: string;
  dict?: {
    title?: string;
    subtitle?: string;
    readMore?: string;
  };
};

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const title =
    dict?.title ?? "Nouvo Ayiti 2075 — Stories for a Restored Nation";
  const subtitle =
    dict?.subtitle ??
    "Reflections, field notes, and visions of dignity, infrastructure, and hope for Haiti.";

  return (
    <section className="na-hero na-hero-bg">
      {/* Background map layer */}
      <div className="na-hero-bg-map">
        <Image
          src="/images/nouvoayiti2075-map.png"
          alt="Haiti map background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="na-hero-bg-overlay" />
      </div>

      {/* Foreground hero layout reuses your existing .na-hero-* CSS */}
      <div className="na-hero-inner">
        <div className="na-hero-copy">
          <h1 className="na-hero-title">{title}</h1>
          <p className="na-hero-subtitle">{subtitle}</p>

          <div className="na-hero-links">
            <Link href={`/${locale}/videos`} className="na-hero-btn-red">
              Watch Videos
            </Link>
            <Link href={`/${locale}/vision`} className="na-hero-btn-black">
              Read the Vision
            </Link>
          </div>
        </div>

        {/* Optional: you can still keep the logo on the right if you like */}
        {/* <div className="na-hero-map">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 logo"
            width={120}
            height={120}
          />
        </div> */}
      </div>
    </section>
  );
}
