import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? "Nouvo Ayiti 2075";
  const cover = searchParams.get("image");
  const locale = searchParams.get("locale") ?? "en";

  //  Localized taglines
  const taglines: Record<string, string> = {
    en: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
    fr: "Restaurer la dignité. Reconstruire l'espoir. Renouveler la vision.",
    ht: "Ranfose diyite. Rebati espwa. Renouvle vizyon.",
    es: "Restaurar la dignidad. Reconstruir la esperanza. Renovar la visión.",
  };

  const tagline = taglines[locale] ?? taglines["en"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {cover ? (
          <img
            src={cover}
            width={1200}
            height={630}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <>
            <h1 style={{ fontSize: 64, fontWeight: "bold", marginBottom: 20 }}>
              {title}
            </h1>
            <p style={{ fontSize: 32, opacity: 0.8 }}>{tagline}</p>
          </>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
