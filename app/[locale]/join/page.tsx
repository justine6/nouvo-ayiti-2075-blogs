import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";

type Props = {
  params: { locale: Locale };
};

export default async function JoinPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{dict.join?.title}</h1>
      <p className="mb-6">{dict.join?.description}</p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder={dict.join?.form?.name}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder={dict.join?.form?.email}
          className="w-full border p-2 rounded"
        />
        <textarea placeholder={dict.join?.form?.message} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {dict.join?.form?.submit}
        </button>
      </form>
    </div>
  );
}
