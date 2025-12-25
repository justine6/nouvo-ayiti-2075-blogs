// app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Topbar from "@/components/Topbar";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LayoutProps) {
  const raw = params?.locale;

  const locale: Locale =
    raw && locales.includes(raw as Locale) ? (raw as Locale) : defaultLocale;

  return (
    <>
      <Topbar locale={locale} />
      <main className="na-page-shell">
        <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
      </main>
    </>
  );
}
