"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function HeroSection() {
  const dict = useDictionary();

  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold">{dict.hero.title}</h1>
      <p className="text-lg text-gray-600">{dict.hero.subtitle}</p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          {dict.hero.readMore}
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          {dict.hero.joinNow}
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
