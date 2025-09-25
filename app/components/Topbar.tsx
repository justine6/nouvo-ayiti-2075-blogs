// components/Topbar.tsx

import Link from "next/link";

type TopbarProps = {
  dict?: {
    home?: string;
    about?: string;
    projects?: string;
    blog?: string;
    contact?: string;
  };
  locale: string;
};

export default function Topbar({ dict = {}, locale }: TopbarProps) {
  const warn = (key: string, fallback: string) => {
    if (
      process.env.NODE_ENV === "development" &&
      !dict[key as keyof typeof dict]
    ) {
      console.warn(
        `⚠️ Missing translation for Topbar.${key}, using fallback "${fallback}"`,
      );
    }
    return dict[key as keyof typeof dict] ?? fallback;
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href={`/${locale}`} className="text-xl font-bold">
          Nouvo Ayiti 2075
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href={`/${locale}`}>{warn("home", "Home")}</Link>
          </li>
          <li>
            <Link href={`/${locale}/about`}>{warn("about", "About")}</Link>
          </li>
          <li>
            <Link href={`/${locale}/projects`}>
              {warn("projects", "Projects")}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/blog`}>{warn("blog", "Blog")}</Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`}>
              {warn("contact", "Contact")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
