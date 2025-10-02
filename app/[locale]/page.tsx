import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ProjectsSection from "@/components/ProjectsSection";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return (
    <div>
      <HeroSection dict={dict.hero} />
      <MissionSection dict={dict.mission} />
      <ProjectsSection dict={dict.projects} />
    </div>
  );
}
