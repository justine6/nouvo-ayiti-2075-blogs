"use client";

import { useState } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

type Props = {
  params: { locale: Locale };
};

export default async function JoinPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return <JoinForm dict={dict.join} />;
}

function JoinForm({ dict }: { dict: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/join", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(dict?.form?.success || "Thank you for joining!");
      e.currentTarget.reset();
    } else {
      setError(dict?.form?.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{dict?.title}</h1>
      <p className="mb-6">{dict?.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder={dict?.form?.name} className="w-full border p-2 rounded" />
        <input
          name="email"
          type="email"
          placeholder={dict?.form?.email}
          className="w-full border p-2 rounded"
        />
        <input name="phone" placeholder={dict?.form?.phone} className="w-full border p-2 rounded" />
        <input
          name="location"
          placeholder={dict?.form?.location}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder={dict?.form?.message}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? dict?.form?.loading || "Submitting..." : dict?.form?.submit}
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">{success}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
