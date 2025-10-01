"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function MissionSection() {
  const dict = useDictionary();

  return (
    <section className="text-center py-12 bg-gray-50">
      <h2 className="text-3xl font-bold">{dict.mission?.heading}</h2>
      <p className="mt-4 text-lg text-gray-600">{dict.mission?.paragraph}</p>
    </section>
  );
}

export default MissionSection;
