import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "fr", "ht", "es"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Ignore static files, API, and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Let through if already localized
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
      // Detect from browser Accept-Language header
      const lang = request.headers
        .get("accept-language")
        ?.split(",")[0]
        .split("-")[0];
      if (lang && SUPPORTED_LOCALES.includes(lang)) {
        locale = lang;
      }
    }

    // ✅ Redirect root → chosen locale
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));

    // Save cookie if not already set
    if (!localeFromCookie) {
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  }

  // ✅ Non-localized path → prefix with locale (cookie > default)
  const locale =
    localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)
      ? localeFromCookie
      : DEFAULT_LOCALE;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // ✅ ignore internals & favicon
};
