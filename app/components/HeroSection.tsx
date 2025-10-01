"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Play, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n/settings";

type HeroDict = {
  title: string;
  subtitle: string;
  joinNow: string;
  readMore: string;
  watchVideos: string;
  goToMain: string;
};

export default function HeroSection({
  dictionary,
  locale,
}: {
  dictionary: HeroDict;
  locale: string | Locale;
}) {
  const base = typeof locale === "string" && locale !== "en" ? `/${locale}` : "";

  const joinHref = `${base}/join`;
  const visionHref = `${base}/vision`;
  const videosHref = `${base}/videos`;
  const mainHref = "https://foundation.nouvoayiti2075.com";

  return (
    <section className="relative isolate overflow-hidden min-h-[80vh]">
      {/* Haiti Map Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/haiti-hero-map1.jpg"
          alt="Haiti Map Background"
          fill
          priority
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-36">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-lg">
          {dictionary.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white sm:text-xl drop-shadow">
          {dictionary.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Join Now */}
          <Link
            href={joinHref}
            className="group inline-flex items-center justify-center rounded-full
                       bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg
                       hover:bg-red-700 hover:shadow-xl
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500
                       active:scale-[.99] transition"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {dictionary.joinNow}
          </Link>

          {/* Vision */}
          <Link
            href={visionHref}
            className="group inline-flex items-center justify-center rounded-full
                       bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-lg
                       hover:shadow-xl
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500
                       active:scale-[.99] transition"
          >
            {dictionary.readMore}
            <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5" />
          </Link>

          {/* Videos */}
          <Link
            href={videosHref}
            className="group inline-flex items-center justify-center rounded-full
                       bg-gray-800/90 px-6 py-3 text-base font-semibold text-white shadow-lg
                       hover:bg-gray-900 hover:shadow-xl
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500
                       active:scale-[.99] transition"
          >
            <Play className="mr-2 h-5 w-5" />
            {dictionary.watchVideos}
          </Link>

          {/* Main Website */}
          <Link
            href={mainHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full
                       bg-yellow-400 px-6 py-3 text-base font-semibold text-gray-900 shadow-lg
                       hover:bg-yellow-500 hover:shadow-xl
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400
                       active:scale-[.99] transition"
          >
            <Globe className="mr-2 h-5 w-5" />
            {dictionary.goToMain}
          </Link>
        </div>
      </div>
    </section>
  );
}
