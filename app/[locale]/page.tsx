import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";
import type { SiteDictionary } from "@/lib/types";

import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
// import BlogSection from "@/components/BlogSection";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const dict: SiteDictionary = await getDictionary(params.locale);

  return (
    <>
      <HeroSection locale={params.locale} dict={dict.hero} />
      <MissionSection locale={params.locale} dict={dict.mission} />
      <ProjectsSection locale={params.locale} dict={dict.projects} />
      {/* <BlogSection locale={params.locale} dict={dict.blog!} /> */}
      <Footer locale={params.locale} dict={dict.footer} />
    </>
  );
}
