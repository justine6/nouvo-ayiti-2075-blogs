"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function ProjectsSection() {
  const dict = useDictionary();

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center">{dict.projects?.title}</h2>
      <p className="mt-4 text-center text-gray-600">{dict.projects?.intro}</p>
      {dict.projects?.motto && (
        <p className="mt-2 text-center italic text-gray-500">{dict.projects.motto}</p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dict.projects?.items?.map((project, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl shadow hover:shadow-md transition bg-white"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
