import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

import VisionSection from "@/components/VisionSection";

type Props = {
  params: { locale: Locale };
};

export default async function VisionPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return (
    <div>
      <VisionSection dict={dict.vision} />
    </div>
  );
}
