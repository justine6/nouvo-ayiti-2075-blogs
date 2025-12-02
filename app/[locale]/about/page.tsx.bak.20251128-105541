import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import LogoBanner from "@/components/LogoBanner";
import PageHeading from "@/components/PageHeading";
import PageSection from "@/components/PageSection";

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <LogoBanner />
      <PageSection>
        <PageHeading>{dict.topbar.about}</PageHeading>
        <p className="mt-4 text-gray-700">
          {dict.about?.intro ||
            "Learn more about the Nouvo Ayiti 2075 movement."}
        </p>
      </PageSection>
    </>
  );
}
