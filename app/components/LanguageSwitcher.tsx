"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "/en/blog"; // ✅ handle possible null
  const [open, setOpen] = useState(false);

  // Derive current locale from the first segment of the path: /en/..., /fr/..., etc.
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0] as Locale | undefined;
  const currentLocale: Locale =
    locales.includes((maybeLocale ?? "en") as Locale)
      ? (maybeLocale as Locale)
      : "en";

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === currentLocale) {
      setOpen(false);
      return;
    }

    const rest = segments.slice(1);
    const newPath = `/${nextLocale}/${rest.join("/")}`;
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white hover:bg-white/10"
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{currentLocale}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              className={`block w-full px-3 py-1 text-left ${
                loc === currentLocale
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
              onClick={() => changeLocale(loc as Locale)}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
