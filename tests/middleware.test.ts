import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "fr", "ht", "es"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Ignore static files, API, favicon, robots.txt, feeds, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname.endsWith(".json") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Already localized → let through
  if (SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // ✅ Check cookie for preferred locale
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  if (pathname === "/") {
    let locale = DEFAULT_LOCALE;

    if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)) {
      locale = localeFromCookie;
    } else {
      const lang = request.headers
        .get("accept-language")
        ?.split(",")[0]
        .split("-")[0];
      if (lang && SUPPORTED_LOCALES.includes(lang)) {
        locale = lang;
      }
    }

    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));

    if (!localeFromCookie) {
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  }

  // ✅ Default redirect for unprefixed paths
  const locale =
    localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)
      ? localeFromCookie
      : DEFAULT_LOCALE;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\.json$).*)"],
};
