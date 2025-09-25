type Props = {
  title?: string;
  subtitle?: string;
  locale: string;
};

export default function Intro({ title, subtitle, locale }: Props) {
  return (
    <section className="text-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {title || "Nouvo Ayiti 2075"}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        {subtitle || "Restoring Dignity. Rebuilding Hope."}
      </p>
    </section>
  );
}
