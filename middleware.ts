import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ Check if pathname starts with one of the supported locales
  const pathnameIsMissingLocale = !/^\/(en|fr|ht|es)(\/|$)/.test(pathname);

  if (pathnameIsMissingLocale) {
    // ✅ Redirect to default locale (/en) if missing
    return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
  }

  return NextResponse.next();
}

// ✅ Ensure middleware runs on all routes
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
