import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/settings";

export default function RootPage() {
  // Redirect "/" to "/<defaultLocale>/blog", e.g. "/en/blog"
  redirect(`/${defaultLocale}/blog`);
}
