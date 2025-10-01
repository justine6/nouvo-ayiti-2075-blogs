"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function JoinSection() {
  const dict = useDictionary();

  return (
    <section className="py-12 text-center bg-gray-50">
      <h2 className="text-3xl font-bold">{dict.join?.form?.title ?? "Join the Movement"}</h2>

      <form className="mt-6 max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder={dict.join?.form?.name ?? "Name"}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder={dict.join?.form?.email ?? "Email"}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="tel"
          placeholder={dict.join?.form?.phone ?? "Phone"}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder={dict.join?.form?.location ?? "Location"}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder={dict.join?.form?.message ?? "Message"}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {dict.join?.form?.submit ?? "Submit"}
        </button>
      </form>
    </section>
  );
}

export default JoinSection;
