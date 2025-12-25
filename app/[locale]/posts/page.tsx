// app/[locale]/posts/page.tsx
// Legacy route: redirect /[locale]/posts to /[locale]/blog

import { redirect } from "next/navigation";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
} from "@/lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LegacyPostsIndex({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);

  // For any /[locale]/posts request, send users to the blog index
  redirect(`/${locale}/blog`);
}
