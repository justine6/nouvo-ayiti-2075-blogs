import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/settings";

type BlogTopbarProps = {
  locale: Locale;
};

export default function BlogTopbar({ locale }: BlogTopbarProps) {
  return (
    <header className="border-b bg-white/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-semibold text-slate-900">
            Nouvo Ayiti 2075 · Blog
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-xs text-slate-600">
          <Link href={`/${locale}/blog`} className="hover:text-slate-900">
            Blog
          </Link>
          <Link href={`/${locale}/projects`} className="hover:text-slate-900">
            Projects
          </Link>
          <Link href={`/${locale}/join`} className="hover:text-slate-900">
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}
