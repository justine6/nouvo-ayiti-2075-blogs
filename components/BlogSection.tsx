type BlogSectionProps = {
  [key: string]: any;
};

export default function BlogSection(_props: BlogSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          This blog listing section for Nouvo Ayiti 2075 is still being wired up. Existing posts
          will appear here as we complete the integration.
        </p>
      </div>
    </section>
  );
}
