// app/layout.tsx
import "./globals.css"; // ✅ adjust path to match your file
import { ReactNode } from "react";

export const metadata = {
  title: "Nouvo Ayiti 2075 Blog",
  description: "Official content for Nouvo Ayiti 2075 Foundation",
  metadataBase: new URL("https://nouvoayiti2075.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {" "}
      {/* ✅ fallback lang for root */}
      <body>{children}</body>
    </html>
  );
}
