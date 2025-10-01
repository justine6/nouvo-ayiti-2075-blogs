import { NextResponse } from "next/server";

// GET /api/reset-locale → clears NEXT_LOCALE cookie
export async function GET() {
  const res = NextResponse.json({ message: "✅ NEXT_LOCALE cookie cleared" });

  res.cookies.set("NEXT_LOCALE", "", {
    path: "/",
    maxAge: 0, // expire immediately
  });

  return res;
}
