"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/settings";

type NavbarProps = {
  locale: Locale;
};

const NAV_ITEMS = [
  { key: "home", label: "Home", path: "" },
  { key: "about", label: "About", path: "/about" },
  { key: "vision", label: "Vision", path: "/vision" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "projects", label: "Projects", path: "/projects" },
  { key: "contact", label: "Contact", path: "/contact" },
];

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="na-navbar">
      <div className="na-navbar-inner">
        <Link href={`/${locale}`} className="na-navbar-brand">
          Nouvo Ayiti 2075 — Blog
        </Link>

        <nav className="na-navbar-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const href =
              item.path === "" ? `/${locale}` : `/${locale}${item.path}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.key}
                href={href}
                className={
                  "na-navbar-link" + (isActive ? " na-navbar-link-active" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="na-navbar-tagline">
          Restoring Haiti with Kiawel Daniel
        </div>
      </div>
    </header>
  );
}
