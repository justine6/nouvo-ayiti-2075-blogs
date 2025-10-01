import { ReactNode } from "react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, Locale } from "@/lib/i18n/settings";

import Topbar from "@/components/Topbar"; // or "@/components/topbar"
import Footer from "@/components/Footer"; // or "@/components/footer"

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

// ✅ Tell Next.js which locales exist at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <Topbar dict={dict.topbar} locale={locale} />
        {children}
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
