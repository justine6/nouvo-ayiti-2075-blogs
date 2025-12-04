// app/components/layout/BlogTopbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { locales, type Locale } from "@/lib/i18n/settings";

type Props = {
  locale: Locale; // initial / fallback locale
};

export default function BlogTopbar({ locale }: Props) {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? ""; // 🔒 never null

  // Try to read the locale from the URL: /en/blog, /fr/projects, etc.
  const segments = pathname.split("/");
  const maybeLocale = segments[1] as Locale | undefined;

  const currentLocale =
    maybeLocale && locales.includes(maybeLocale) ? maybeLocale : locale;

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 Logo"
            width={40}
            height={40}
            className="rounded-full shadow"
          />

          <Link href={`/${currentLocale}/blog`} className="font-bold text-lg">
            Ayiti 2075 Blog
          </Link>
        </div>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href={`/${currentLocale}/blog`}
            className={`hover:underline ${
              pathname.includes("/blog") ? "font-semibold text-[#be123c]" : ""
            }`}
          >
            Blog
          </Link>

          <Link
            href={`/${currentLocale}/projects`}
            className={`hover:underline ${
              pathname.includes("/projects")
                ? "font-semibold text-[#be123c]"
                : ""
            }`}
          >
            Projects
          </Link>

          <Link
            href={`/${currentLocale}/join`}
            className="px-4 py-2 rounded-xl bg-[#be123c] text-white text-sm shadow hover:bg-red-700"
          >
            Join the movement
          </Link>

          {/* Language switcher stays typed with Locale */}
          <LanguageSwitcher locale={currentLocale} />
        </nav>
      </div>
    </header>
  );
}
