// app/[locale]/layout.tsx

import { ReactNode } from "react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        {/* ✅ Localized Topbar */}
        <Topbar dict={dict.topbar} locale={locale} />

        {/* ✅ Page Content */}
        {children}

        {/* ✅ Localized Footer */}
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
