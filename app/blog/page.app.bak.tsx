import { redirect } from "next/navigation";

export default function BlogRootPage() {
  // Redirect bare /blog to the English locale blog.
  // You can change "en" to another default locale if desired.
  redirect("/en/blog");
}
