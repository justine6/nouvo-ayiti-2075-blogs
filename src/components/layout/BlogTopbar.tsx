"use client";

import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/settings";

type BlogTopbarProps = {
  locale: Locale;
};

export default function BlogTopbar({ locale }: BlogTopbarProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: logo + title */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 logo"
            width={32}
            height={32}
          />
          <span className="text-sm font-semibold">
            Nouvo Ayiti 2075 · Ayiti 2075 Blog
          </span>
        </Link>

        {/* Right: simple nav */}
        <nav className="flex items-center gap-4 text-sm">
          <Link href={`/${locale}/blog`} className="hover:underline">
            Blog home
          </Link>
          <Link href={`/${locale}/projects`} className="hover:underline">
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
