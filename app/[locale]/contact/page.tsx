// ✅ Safe locale fallback applied
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import LogoBanner from "@/components/LogoBanner";
import PageHeading from "@/components/PageHeading";
import PageSection from "@/components/PageSection";

type Props = {
  params: { locale: Locale };
};

export default async function ContactPage({ params }: Props) {
  const locale = params?.locale || "en"; // ✅ ensures no undefined
  const dict = await getDictionary(params?.locale || "en");

  return (
    <>
      <LogoBanner />
      <PageSection>
        <PageHeading>{dict.topbar.contact}</PageHeading>
        <div className="mt-4 space-y-2 text-gray-700">
          <p>{dict.contact?.address || "848 Brickell Avenue Suite PH5, Miami FL 33131"}</p>
          <p>{dict.contact?.email || "nouvoayiti2075@gmail.com"}</p>
          <p>{dict.contact?.phone || "+1 (918) 640-8249"}</p>
        </div>
      </PageSection>
    </>
  );
}
