"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";
import { Globe } from "lucide-react";
import { useState } from "react";

// Flags + full names
const localeLabels: Record<Locale, string> = {
  en: "🇺🇸 English",
  fr: "🇫🇷 Français",
  ht: "🇭🇹 Kreyòl",
  es: "🇪🇸 Español",
};

type Props = {
  variant?: "desktop" | "mobile";
  mode?: "dropdown" | "icon";
};

export default function LanguageSwitcher({ variant = "desktop", mode = "dropdown" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentLocale = pathname.split("/")[1] as Locale;

  const changeLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  // ✅ reorder locales: current first
  const orderedLocales = [currentLocale, ...locales.filter((l) => l !== currentLocale)];

  if (mode === "icon") {
    return (
      <div className="relative">
        {/* Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Globe size={18} />
          <span>{localeLabels[currentLocale]}</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border rounded-md shadow-lg z-50">
            {orderedLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => changeLocale(loc)}
                className={`block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  currentLocale === loc ? "font-semibold text-blue-600" : ""
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default: Dropdown
  return (
    <select
      onChange={(e) => changeLocale(e.target.value as Locale)}
      value={currentLocale}
      className={`${
        variant === "desktop"
          ? "border rounded px-2 py-1 text-sm"
          : "w-full border rounded px-3 py-2 mt-2"
      }`}
    >
      {orderedLocales.map((loc) => (
        <option key={loc} value={loc}>
          {localeLabels[loc]}
        </option>
      ))}
    </select>
  );
}
