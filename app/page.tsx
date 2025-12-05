// app/page.tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/settings";

export default function RootPage() {
  // Redirect "/" to "/<defaultLocale>", e.g. "/en"
  redirect(`/${defaultLocale}`);
}
