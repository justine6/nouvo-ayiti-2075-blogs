import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");

  const publicDir = path.join(process.cwd(), "public");

  // pick file based on locale
  let feedFile = "feed.json"; // default combined
  if (locale && ["en", "fr", "ht", "es"].includes(locale)) {
    feedFile = `${locale}-feed.json`;
  }

  const filePath = path.join(publicDir, feedFile);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: `Feed not found for locale: ${locale}` },
      { status: 404 },
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);

  return NextResponse.json(jsonData);
}





