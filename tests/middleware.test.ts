import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import middleware from "../middleware";

// ✅ Mock request helper with cookies + headers
function mockRequest(url: string, options: any = {}) {
  const headers = new Headers(options.headers || {});

  if (options.cookies) {
    const cookieString = Object.entries(options.cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
    headers.set("cookie", cookieString);
  }

  return new NextRequest(url, { headers } as any);
}

describe("middleware", () => {
  it("should ignore static files", () => {
    const req = mockRequest("http://localhost/_next/static/chunk.js");
    const res = middleware(req);
    // ✅ safer: ensure no redirect
    expect(res?.headers.get("location")).toBeNull();
  });

  it("should ignore API routes", () => {
    const req = mockRequest("http://localhost/api/data");
    const res = middleware(req);
    expect(res?.headers.get("location")).toBeNull();
  });

  it("should ignore favicon", () => {
    const req = mockRequest("http://localhost/favicon.ico");
    const res = middleware(req);
    expect(res?.headers.get("location")).toBeNull();
  });

  it("should allow already localized paths", () => {
    const req = mockRequest("http://localhost/fr/about");
    const res = middleware(req);
    expect(res?.headers.get("location")).toBeNull();
  });

  it("should redirect root to default locale if no cookie", () => {
    const req = mockRequest("http://localhost/");
    const res = middleware(req);
    expect(res?.headers.get("location")).toBe("http://localhost/en");
  });

  it("should redirect root using NEXT_LOCALE cookie", () => {
    const req = mockRequest("http://localhost/", {
      cookies: { NEXT_LOCALE: "ht" },
    });
    const res = middleware(req);
    expect(res?.headers.get("location")).toBe("http://localhost/ht");
  });

  it("should detect browser language if supported", () => {
    const req = mockRequest("http://localhost/", {
      headers: { "accept-language": "es-ES,es;q=0.9" },
    });
    const res = middleware(req);
    expect(res?.headers.get("location")).toBe("http://localhost/es");
  });

  it("should prefix non-localized path with cookie locale", () => {
    const req = mockRequest("http://localhost/about", {
      cookies: { NEXT_LOCALE: "fr" },
    });
    const res = middleware(req);
    expect(res?.headers.get("location")).toBe("http://localhost/fr/about");
  });

  it("should prefix non-localized path with default locale if no cookie", () => {
    const req = mockRequest("http://localhost/about");
    const res = middleware(req);
    expect(res?.headers.get("location")).toBe("http://localhost/en/about");
  });
});
