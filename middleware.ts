// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_LOCALES = ["en", "fr", "ht", "es"] as const;
type Locale = (typeof PUBLIC_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";

// Type-guard, no `any`
function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    (PUBLIC_LOCALES as readonly string[]).includes(value)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next.js internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Already has locale: /en/..., /fr/..., /ht/..., /es/...
  const segments = pathname.split("/").filter(Boolean); // e.g. ["en","projects"]
  const first = segments[0];

  if (isLocale(first)) {
    return NextResponse.next();
  }

  // ✅ Root "/" → "/en" (home page with hero)
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // "/projects" (and any other non-localized route) → "/en/projects"
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
