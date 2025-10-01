"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function VisionSection() {
  const dict = useDictionary();

  return (
    <section className="py-12 text-center bg-white">
      <h2 className="text-3xl font-bold">{dict.vision?.title}</h2>
      <p className="mt-4 text-gray-600">{dict.vision?.intro}</p>
      <div className="mt-6 max-w-3xl mx-auto text-gray-700 leading-relaxed">
        {dict.vision?.content}
      </div>
    </section>
  );
}

export default VisionSection;
