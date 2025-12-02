import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type Props = { params: { locale: string } };

type ContactDict = {
  title?: string;
  intro?: string;
  addressLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  footerNote?: string;
};

export default async function ContactPage({ params }: Props) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const dict = (await getDictionary(locale, "contact")) as ContactDict;

  const title = dict.title ?? "Contact Us";
  const intro =
    dict.intro ?? "Get in touch with the Nouvo Ayiti 2075 movement.";
  const addressLabel = dict.addressLabel ?? "Address";
  const emailLabel = dict.emailLabel ?? "Email";
  const phoneLabel = dict.phoneLabel ?? "Phone";
  const footerNote = dict.footerNote ?? "We look forward to hearing from you.";

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

      <p className="mt-4 text-gray-700">{intro}</p>

      <div className="mt-6 space-y-4">
        <p className="font-semibold">{addressLabel}</p>
        <p className="font-semibold">{emailLabel}</p>
        <p className="font-semibold">{phoneLabel}</p>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        {footerNote} — Locale: {locale.toUpperCase()}
      </p>
    </main>
  );
}
