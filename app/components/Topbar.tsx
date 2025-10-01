import Link from "next/link";

type TopbarProps = {
  dict?: {
    home?: string;
    about?: string;
    projects?: string;
    blog?: string;
    contact?: string;
    vision?: string;
    language?: string;
  };
  locale: string;
};

export default function Topbar({ dict, locale }: TopbarProps) {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="font-bold text-lg">Nouvo Ayiti 2075</div>
      <ul className="flex gap-4">
        <li>
          <Link href={`/${locale}`}>{dict?.home ?? "Home"}</Link>
        </li>
        <li>
          <Link href={`/${locale}/about`}>{dict?.about ?? "About"}</Link>
        </li>
        <li>
          <Link href={`/${locale}/projects`}>{dict?.projects ?? "Projects"}</Link>
        </li>
        <li>
          <Link href={`/${locale}/blog`}>{dict?.blog ?? "Blog"}</Link>
        </li>
        <li>
          <Link href={`/${locale}/contact`}>{dict?.contact ?? "Contact"}</Link>
        </li>
        <li>
          <Link href={`/${locale}/vision`}>{dict?.vision ?? "Vision"}</Link>
        </li>
      </ul>
    </nav>
  );
}
