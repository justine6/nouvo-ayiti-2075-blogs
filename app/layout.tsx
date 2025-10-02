import type { DefaultMetadata, LayoutProps } from "@/types/layout";
import "./globals.css";

export const metadata: DefaultMetadata = {
  title: "Nouvo Ayiti 2075",
  description: "Restoring Dignity. Rebuilding Hope. Renewing Vision.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
