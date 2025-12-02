"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";

type TopbarProps = {
  locale: string;
};

export default function Topbar({ locale }: TopbarProps) {
  const pathname = (usePathname() ?? `/${locale}/blog`) as string;
  const [isOpen, setIsOpen] = useState(false);

  const navClass = (segment: string) => {
    // Strip leading locale: /en/vision -> /vision
    const normalized = pathname.replace(/^\/[A-Za-z]{2}/, "");
    const target = segment === "/" ? "" : segment;
    const isActive =
      normalized === target || normalized.startsWith(target + "/");

    const base =
      "na-nav-link text-sm font-medium text-white/80 hover:text-white";
    return isActive ? `${base} na-nav-link-active` : base;
  };

  return (
    <header className="na-topbar">
      <div className="na-topbar-inner">
        <Link href={`/${locale}/blog`} className="flex items-center gap-2">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075"
            width={32}
            height={32}
          />
          <span className="text-sm font-semibold text-white">
            Nouvo Ayiti 2075 • Blog
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <Link href={`/${locale}/blog`} className={navClass("/blog")}>
            Blog
          </Link>
          <Link href={`/${locale}/vision`} className={navClass("/vision")}>
            Vision
          </Link>
          <Link href={`/${locale}/projects`} className={navClass("/projects")}>
            Projects
          </Link>
          <Link href={`/${locale}/videos`} className={navClass("/videos")}>
            Videos
          </Link>
          <Link href={`/${locale}/contact`} className={navClass("/contact")}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-2 py-1 text-xs text-white md:hidden"
            onClick={() => setIsOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 bg-black/80 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href={`/${locale}/blog`}
              className={navClass("/blog")}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href={`/${locale}/vision`}
              className={navClass("/vision")}
              onClick={() => setIsOpen(false)}
            >
              Vision
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={navClass("/projects")}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href={`/${locale}/videos`}
              className={navClass("/videos")}
              onClick={() => setIsOpen(false)}
            >
              Videos
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={navClass("/contact")}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
