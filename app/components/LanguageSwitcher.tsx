// app/components/LanguageSwitcher.tsx
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";

type LanguageSwitcherProps = {
  locale: Locale;
};

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Use a safe path even if pathname is null (during prerender)
  const safePath = pathname ?? `/${locale}`;
  const parts = safePath.split("/");

  const maybeLocale = parts[1] as Locale | undefined;
  const currentLocale = locales.includes(maybeLocale ?? locale)
    ? (maybeLocale as Locale)
    : locale;

  const changeLocale = (newLocale: Locale) => {
    // If we don't have a pathname yet, just send them to the locale root
    if (!pathname) {
      router.push(`/${newLocale}`);
      setOpen(false);
      return;
    }

    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
    }

    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm hover:bg-gray-100"
      >
        {currentLocale.toUpperCase()}
        <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 rounded-lg border bg-white shadow-lg z-20">
          <ul className="py-1 text-xs">
            {locales.map((loc) => (
              <li key={loc}>
                <button
                  type="button"
                  onClick={() => changeLocale(loc)}
                  className={
                    "w-full px-3 py-1 text-left hover:bg-gray-100 " +
                    (loc === currentLocale ? "font-bold" : "")
                  }
                >
                  {loc.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
