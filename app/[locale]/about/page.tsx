import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

import AboutSection from "@/components/AboutSection";

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return (
    <div>
      <AboutSection dict={dict.about} />
    </div>
  );
}
