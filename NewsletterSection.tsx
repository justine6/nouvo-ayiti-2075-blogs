"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function NewsletterSection() {
  const dict = useDictionary();

  return (
    <section className="text-center py-12">
      <h2 className="text-2xl font-bold">{dict.newsletter?.title}</h2>
      <p className="mt-2 text-gray-600">{dict.newsletter?.description}</p>

      <form className="mt-6 flex justify-center gap-2">
        <input
          type="email"
          placeholder={dict.newsletter?.placeholder ?? "Enter your email"}
          className="px-4 py-2 border rounded-lg w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {dict.newsletter?.subscribe ?? "Subscribe"}
        </button>
      </form>
    </section>
  );
}

export default NewsletterSection;
