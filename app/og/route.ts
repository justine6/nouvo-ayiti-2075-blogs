import { ImageResponse } from "@vercel/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Accept slug + fallback
  const slug = searchParams.get("slug") || "hello-world";
  const locale = searchParams.get("locale") || "en";

  // Locate the MDX file
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent); // parse frontmatter

  const title = data.title || "Nouvo Ayiti 2075";
  const excerpt = data.excerpt || "Restoring Dignity. Rebuilding Hope. Renewing Vision.";

  const taglines: Record<string, string> = {
    en: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
    fr: "Restaurer la dignité. Reconstruire l’espoir. Renouveler la vision.",
    ht: "Ranfòse diyite. Rebati espwa. Renouvle vizyon.",
    es: "Restaurar la dignidad. Reconstruir la esperanza. Renovar la visión.",
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Inter, sans-serif",
          padding: "60px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src="https://blogs.nouvoayiti2075.com/logo.png"
          alt="Nouvo Ayiti 2075 Logo"
          width={120}
          height={120}
          style={{ marginBottom: "30px" }}
        />

        {/* Title */}
        <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "20px" }}>
          {title}
        </h1>

        {/* Excerpt or tagline */}
        <p style={{ fontSize: "28px", opacity: 0.9 }}>
          {excerpt || taglines[locale]}
        </p>

        {/* Footer URL */}
        <p style={{ fontSize: "22px", marginTop: "40px", opacity: 0.7 }}>
          blogs.nouvoayiti2075.com
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
