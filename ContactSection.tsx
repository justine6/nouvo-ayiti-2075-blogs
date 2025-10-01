"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/DictionaryContext";

function ContactSection() {
  const dict = useDictionary();

  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold">{dict.contact?.title ?? "Contact Us"}</h2>
      <p className="mt-4 text-gray-600">{dict.contact?.description}</p>

      <div className="mt-6 space-y-2">
        {dict.contact?.email && (
          <p>
            📧{" "}
            <a href={`mailto:${dict.contact.email}`} className="text-blue-600 hover:underline">
              {dict.contact.email}
            </a>
          </p>
        )}
        {dict.contact?.phone && (
          <p>
            📞{" "}
            <a href={`tel:${dict.contact.phone}`} className="text-blue-600 hover:underline">
              {dict.contact.phone}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
