import type { Metadata } from "next";

type PageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata(): Metadata {
  return {
    title: "About – Ayiti 2075 Blog",
    description: "Learn more about the Nouvo Ayiti 2075 blog and vision.",
  };
}

export default function AboutPage({ params }: PageProps) {
  const { locale } = params;

  return (
    <main className="min-h-screen bg-white py-10">
      <section className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold">About this blog</h1>
        <p className="mt-4 text-sm text-neutral-700">
          This is a placeholder about page for the Ayiti 2075 blog (
          <span className="font-mono">{locale}</span> locale). You can replace
          this text later with a proper story and team introduction.
        </p>
      </section>
    </main>
  );
}
