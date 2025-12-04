"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";

type TopbarProps = {
  locale: Locale;
};

const navItems: { label: string; path: string }[] = [
  { label: "Home", path: "" },
  { label: "About", path: "about" },
  { label: "Vision", path: "vision" },
  { label: "Blog", path: "blog" },
  { label: "Projects", path: "projects" },
  { label: "Contact", path: "contact" },
];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ht: "HT",
  es: "ES",
};

export default function Topbar({ locale }: TopbarProps) {
  const pathnameRaw = usePathname(); // string | null
  const pathname = pathnameRaw ?? ""; // 🔒 never null from here on

  // Derive current locale from path if possible, fall back to prop
  const segments = pathname.split("/"); // safe: pathname is always a string
  const maybeLocale = segments[1] as Locale | undefined;

  const currentLocale =
    maybeLocale && locales.includes(maybeLocale) ? maybeLocale : locale;

  const normalize = (path: string) => path.split("?")[0].split("#")[0];

  const basePath = normalize(pathname);

  const buildHref = (loc: Locale, segment: string) =>
    segment === "" ? `/${loc}` : `/${loc}/${segment}`;

  const isActive = (loc: Locale, segment: string) => {
    const href = buildHref(loc, segment);
    if (!basePath) return false;

    // Exact match for homepage
    if (segment === "" && basePath === `/${loc}`) return true;

    // Starts-with for nested routes (/en/blog/slug)
    return basePath.startsWith(href) && href !== `/${loc}`;
  };

  return (
    <header className="na-topbar">
      <div className="na-topbar-inner">
        {/* Brand / logo */}
        <Link href={`/${currentLocale}`} className="na-topbar-brand">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 Logo"
            width={32}
            height={32}
            className="na-topbar-logo"
            priority
          />
          <span className="na-topbar-title">Nouvo Ayiti 2075 — Blog</span>
        </Link>

        {/* Main nav */}
        <nav className="na-topbar-nav" aria-label="Main navigation">
          {navItems.map(({ label, path }) => {
            const href = buildHref(currentLocale, path);
            const active = isActive(currentLocale, path);

            return (
              <Link
                key={label}
                href={href}
                className={
                  "na-topbar-link" + (active ? " na-topbar-link--active" : "")
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster: profile -> CTA -> locales */}
        <div className="na-topbar-right">
          {/* Kiawel profile */}
          <div className="na-topbar-profile">
            <Image
              src="/images/kiawel-daniel.png"
              alt="Kiawel Daniel"
              width={28}
              height={28}
              className="na-topbar-avatar"
            />
            <span className="na-topbar-signature">
              Restoring Haiti with Kiawel Daniel
            </span>
          </div>

          {/* Join CTA – goes to main foundation site */}
          <a
            href={`https://nouvoayiti2075.com/${currentLocale}/join`}
            className="na-topbar-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Movement
          </a>

          {/* Language pills */}
          <div className="na-topbar-locales" aria-label="Choose language">
            {locales.map((loc) => {
              const active = loc === currentLocale;
              return (
                <Link
                  key={loc}
                  href={`/${loc}/blog`}
                  className={
                    "na-locale-link" + (active ? " na-locale-link--active" : "")
                  }
                >
                  {localeLabels[loc]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
