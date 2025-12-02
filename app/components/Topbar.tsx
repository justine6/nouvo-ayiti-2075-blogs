"use client";

import Link from "next/link";

type LegacyTopbarProps = {
  locale?: string;
};

export default function LegacyTopbar({ locale = "en" }: LegacyTopbarProps) {
  // Simple, hook-free legacy topbar used by older layouts.
  // The real navigation lives in app/components/navigation/Topbar.tsx.
  return (
    <header className="na-topbar">
      <div className="na-topbar-inner">
        <Link href={`/${locale}/blog`} className="text-sm font-semibold text-white">
          Nouvo Ayiti 2075 • Blog
        </Link>
      </div>
    </header>
  );
}
