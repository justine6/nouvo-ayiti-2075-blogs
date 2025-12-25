"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/settings";

type Props = {
  currentLocale: Locale;
};

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ht: "HT",
  es: "ES",
};

export default function LanguageSwitcher({ currentLocale }: Props) {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "";

  // Strip locale from current path and reapply chosen locale
  const parts = pathname.split("/").filter(Boolean);
  const maybeLocale = parts[0] as Locale | undefined;

  const rest =
    maybeLocale && locales.includes(maybeLocale)
      ? parts.slice(1).join("/")
      : parts.join("/");

  const buildHref = (loc: Locale) => (rest ? `/${loc}/${rest}` : `/${loc}`);

  return (
    <div className="na-topbar-locales" aria-label="Choose language">
      {locales.map((loc) => {
        const active = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={buildHref(loc)}
            className={"na-locale-link" + (active ? " na-locale-link--active" : "")}
          >
            {localeLabels[loc]}
          </Link>
        );
      })}
    </div>
  );
}
