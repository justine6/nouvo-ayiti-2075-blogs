// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "fr", "ht", "es"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔎 Middleware triggered:", pathname);

  // ✅ Skip static files & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    console.log("➡ Skipping static/API:", pathname);
    return NextResponse.next();
  }

  // ✅ Already localized → let it pass
  const pathLocale = pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(pathLocale)) {
    console.log("➡ Already localized:", pathname);
    return NextResponse.next();
  }

  // ✅ Only redirect root ("/"), not other paths
  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language");
    let preferredLocale = DEFAULT_LOCALE;

    if (acceptLang) {
      const userLang = acceptLang.split(",")[0].split("-")[0];
      if (SUPPORTED_LOCALES.includes(userLang)) {
        preferredLocale = userLang;
      }
    }

    console.log("➡ Redirecting root →", `/${preferredLocale}`);
    return NextResponse.redirect(
      new URL(`/${preferredLocale}`, request.url),
      307
    );
  }

  // ✅ For non-localized paths (like "/about")
  console.log("➡ Redirecting non-localized:", pathname);
  return NextResponse.redirect(
    new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url),
    307
  );
}
