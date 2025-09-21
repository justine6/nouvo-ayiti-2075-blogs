import "../globals.css";
import type { ReactNode } from "react";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

type Props = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  return (
    <html lang="en" className="dark">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <div className="min-h-screen flex flex-col">
          <Topbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
