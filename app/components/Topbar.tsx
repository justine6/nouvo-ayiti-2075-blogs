"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/settings";

type NavLabels = {
  home: string;
  vision: string;
  projects: string;
  blog: string;
  contact: string;
  joinMovement: string;
};

type Props = {
  locale: string;
  dict?: {
    nav?: Partial<NavLabels>;
  };
};

// Main site base URL (non-blog)
const MAIN_SITE_BASE = "https://www.nouvoayiti2075.com";

// Built-in labels per locale (fallback if dict is missing)
const FALLBACK_NAV: Record<string, NavLabels> = {
  en: {
    home: "Home",
    vision: "Vision",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    joinMovement: "Join the movement",
  },
  fr: {
    home: "Accueil",
    vision: "Vision",
    projects: "Projets",
    blog: "Blog",
    contact: "Contact",
    joinMovement: "Rejoindre le mouvement",
  },
  ht: {
    home: "Lakay",
    vision: "Vizion",
    projects: "Pwòjè",
    blog: "Blog",
    contact: "Kontak",
    joinMovement: "Antre nan mouvman an",
  },
};

export default function Topbar({ locale, dict }: Props) {
  const pathname = usePathname();

  // 1) Merge fallback + dictionary
  const base = FALLBACK_NAV[locale] ?? FALLBACK_NAV.en;
  const labels: NavLabels = {
    ...base,
    ...(dict?.nav ?? {}),
  };

  // 2) Helper: compute active nav link (blog routes only)
  const navClass = (segment: string) => {
    // Strip leading locale: /en/vision -> /vision
    const normalized = pathname.replace(/^\/[a-z]{2}/, "");
    const target = segment === "/" ? "" : segment;

    const isActive =
      normalized === target || normalized.startsWith(target + "/");

    // Always include base class, optionally add "active"
    return "na-topbar-link" + (isActive ? " na-topbar-link-active" : "");
  };

  // 3) Helper: keep same blog page when switching language
  const localizedPath = (targetLocale: string) =>
    "/" + targetLocale + pathname.replace(/^\/[a-z]{2}/, "");

  return (
    <header className="na-topbar">
      <div className="na-topbar-inner">
        {/* LEFT — Logo + Site Title */}
        <Link href={`/${locale}`} className="na-topbar-brand">
          <div className="na-topbar-logo-circle">
            <Image
              src="/images/nouvoayiti2075-logo.png"
              alt="Nouvo Ayiti 2075 Logo"
              width={40}
              height={40}
              className="na-topbar-logo-img"
            />
          </div>
          <span className="na-topbar-title">Nouvo Ayiti 2075</span>
        </Link>

        {/* CENTER — Navigation */}
        <div className="na-topbar-nav-wrap">
          <nav className="na-topbar-nav">
            {/* Home → main site root (not the blog) */}
            <Link
              href={MAIN_SITE_BASE}
              prefetch={false}
              className="na-topbar-link"
            >
              {labels.home}
            </Link>

            <Link href={`/${locale}/vision`} className={navClass("/vision")}>
              {labels.vision}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={navClass("/projects")}
            >
              {labels.projects}
            </Link>
            <Link href={`/${locale}/blog`} className={navClass("/blog")}>
              {labels.blog}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={navClass("/contact")}
            >
              {labels.contact}
            </Link>
          </nav>
        </div>

        {/* RIGHT — CTA + Languages + Signature */}
        <div className="na-topbar-right">
          {/* Join the movement → main site join form */}
          <Link
            href={`${MAIN_SITE_BASE}/join`}
            prefetch={false}
            className="na-topbar-cta"
          >
            {labels.joinMovement}
          </Link>

          <div className="na-topbar-lang-switch">
            {locales.map((code) => (
              <Link
                key={code}
                href={localizedPath(code)}
                className={
                  "na-lang-pill" +
                  (code === locale ? " na-lang-pill-active" : "")
                }
              >
                {code.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="na-topbar-guide">
            <span className="na-topbar-guide-label">Guided by</span>
            <div className="na-topbar-guide-person">
              <Image
                src="/images/kiawel-daniel.png"
                alt="Kiawel Daniel"
                width={32}
                height={32}
                className="na-topbar-guide-avatar"
              />
              <span className="na-topbar-guide-name">Kiawel Daniel</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
