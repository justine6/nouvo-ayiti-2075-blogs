// app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Topbar from "@/components/Topbar";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LayoutProps) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return (
    <div className="na-page-shell">
      <Topbar locale={locale} />
      <div className="na-page-shell-inner">
        {children}
      </div>
    </div>
  );
}
