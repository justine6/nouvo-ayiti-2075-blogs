import type { Metadata } from "next";

type PageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata(): Metadata {
  return {
    title: "Contact – Ayiti 2075 Blog",
    description: "Get in touch with the Nouvo Ayiti 2075 team.",
  };
}

export default function ContactPage({ params }: PageProps) {
  const { locale } = params;

  return (
    <main className="min-h-screen bg-white py-10">
      <section className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-4 text-sm text-neutral-700">
          This is a placeholder contact page for the Ayiti 2075 blog (
          <span className="font-mono">{locale}</span> locale). Later you can add
          real contact forms or links.
        </p>
      </section>
    </main>
  );
}
