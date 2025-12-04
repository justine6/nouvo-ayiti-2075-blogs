// app/components/Topbar.tsx
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/settings";

type TopbarProps = {
  locale: Locale;
};

export default function Topbar({ locale }: TopbarProps) {
  const locales: Locale[] = ["en", "fr", "ht", "es"];

  return (
    <header className="na-topbar">
      <div className="na-topbar-inner">
        {/* Left: Logo + Brand */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 na-topbar-brand"
        >
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti Logo"
            width={34}
            height={34}
            className="rounded-full border border-gray-300 shadow-sm"
          />
          <span>Nouvo Ayiti 2075 — Blog</span>
        </Link>

        {/* Middle: Navigation */}
        <nav className="na-topbar-nav">
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/about`}>About</Link>
          <Link href={`/${locale}/vision`}>Vision</Link>
          <Link href={`/${locale}/blog`}>Blog</Link>
          <Link href={`/${locale}/projects`}>Projects</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
        </nav>

        {/* Right: Signature + Languages */}
        <div className="na-topbar-right">
          <span className="na-topbar-signature">
            Restoring Haiti with Kiawel Daniel
          </span>

          <nav className="na-topbar-locales">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={
                  "na-locale-link" +
                  (code === locale ? " na-locale-link--active" : "")
                }
              >
                {code.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
