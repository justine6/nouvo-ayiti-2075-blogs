import { redirect } from "next/navigation";

export default function LegacyBlogPage() {
  // Legacy /blog route – send people to the localized blog.
  redirect("/en/blog");
}
