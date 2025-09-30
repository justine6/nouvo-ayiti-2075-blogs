// components/Topbar.tsx

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
    <nav className="flex gap-6 p-4 bg-gray-100">
      <Link href={`/${locale}`}>{dict?.home}</Link>
      <Link href={`/${locale}/about`}>{dict?.about}</Link>
      <Link href={`/${locale}/projects`}>{dict?.projects}</Link>
      <Link href={`/${locale}/blog`}>{dict?.blog}</Link>
      <Link href={`/${locale}/contact`}>{dict?.contact}</Link>
      <Link href={`/${locale}/vision`}>{dict?.vision}</Link>
      {/* Language switcher would use dict?.language */}
    </nav>
  );
}
