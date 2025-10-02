import type { LocaleLayoutProps, DefaultMetadata, LocaleMetadataMap } from "@/types/layout";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import "../globals.css";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

const baseUrl = "https://projects.jutellane.com"; // adjust if needed

const localizedMetadata: LocaleMetadataMap = {
  en: {
    title: "Nouvo Ayiti 2075",
    description: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
    openGraph: {
      title: "Nouvo Ayiti 2075",
      description: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
      images: [`${baseUrl}/images/og-en.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nouvo Ayiti 2075",
      description: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
      images: [`${baseUrl}/images/og-en.png`],
    },
  },
  fr: {
    title: "Nouvelle Haïti 2075",
    description: "Restaurer la dignité. Reconstruire l'espoir. Renouveler la vision.",
    openGraph: {
      title: "Nouvelle Haïti 2075",
      description: "Restaurer la dignité. Reconstruire l'espoir. Renouveler la vision.",
      images: [`${baseUrl}/images/og-fr.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nouvelle Haïti 2075",
      description: "Restaurer la dignité. Reconstruire l'espoir. Renouveler la vision.",
      images: [`${baseUrl}/images/og-fr.png`],
    },
  },
  ht: {
    title: "Nouvo Ayiti 2075",
    description: "Ranfòse diyite. Rebati espwa. Renouvle vizyon.",
    openGraph: {
      title: "Nouvo Ayiti 2075",
      description: "Ranfòse diyite. Rebati espwa. Renouvle vizyon.",
      images: [`${baseUrl}/images/og-ht.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nouvo Ayiti 2075",
      description: "Ranfòse diyite. Rebati espwa. Renouvle vizyon.",
      images: [`${baseUrl}/images/og-ht.png`],
    },
  },
  es: {
    title: "Nueva Haití 2075",
    description: "Restaurar la dignidad. Reconstruir la esperanza. Renovar la visión.",
    openGraph: {
      title: "Nueva Haití 2075",
      description: "Restaurar la dignidad. Reconstruir la esperanza. Renovar la visión.",
      images: [`${baseUrl}/images/og-es.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nueva Haití 2075",
      description: "Restaurar la dignidad. Reconstruir la esperanza. Renovar la visión.",
      images: [`${baseUrl}/images/og-es.png`],
    },
  },
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }: LocaleLayoutProps): Promise<DefaultMetadata> {
  const { locale } = params;
  return localizedMetadata[locale] || localizedMetadata["en"];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Topbar dict={dict.topbar} locale={locale} />
        {children}
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
