import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Nouvo Ayiti 2075 — Blog",
  description: "Stories, updates, and visions for the future of Haiti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <main className="flex-1">{children}</main>
        {/* Global footer with WIP message + Facebook video */}
        <Footer />
      </body>
    </html>
  );
}
