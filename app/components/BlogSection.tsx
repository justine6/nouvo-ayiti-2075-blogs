type BlogSectionProps = {
  dict: any;
  locale: string;
};

export default function BlogSection({ dict = {}, locale }: BlogSectionProps) {
  const warn = (key: keyof typeof dict, fallback: string) => {
    if (process.env.NODE_ENV === "development" && !dict[key]) {
      console.warn(
        `⚠️ Missing translation for BlogSection.${key}, using fallback "${fallback}"`,
      );
    }
    return dict[key] ?? fallback;
  };

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{warn("title", "Our Blog")}</h2>
      <p className="text-gray-600 mb-8">
        {warn("subtitle", "Stories, updates, and visions for the future.")}
      </p>

      {/* TODO: Replace with mapped blog posts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded-lg shadow">
          <h3 className="text-xl font-semibold">Sample Blog Post</h3>
          <p className="text-gray-600 mt-2">
            This is a placeholder blog card. Real posts will appear here.
          </p>
        </div>
      </div>

      {/* ✅ View All button */}
      <div className="mt-8 text-center">
        <a
          href={`/${locale}/blog`}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          {warn("viewAll", "View All Posts")}
        </a>
      </div>
    </section>
  );
}







