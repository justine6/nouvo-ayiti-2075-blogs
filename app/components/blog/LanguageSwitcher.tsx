"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";

type Props = {
  locale: Locale;
};

export default function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || "/";

  // Replace the first segment (/en, /fr, /ht, /es) with the target locale
  function buildHref(target: Locale) {
    const parts = pathname.split("/");

    // parts[0] is "", parts[1] is maybe a locale
    if (locales.includes(parts[1] as Locale)) {
      parts[1] = target;
      const joined = parts.join("/");
      return joined.startsWith("//") ? joined.slice(1) : joined || "/";
    }

    // If no locale segment, prefix the path with the target locale
    const suffix = pathname === "/" ? "" : pathname;
    return `/${target}${suffix}`;
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            href={buildHref(code)}
            className={[
              "px-3 py-1 rounded-full text-xs font-semibold border transition",
              isActive
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
            ].join(" ")}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
