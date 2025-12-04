// lib/get-all-posts.ts

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  coverImage?: string;
}

// For now we keep a simple in-memory list.
// You can tweak the text however you like.
const POSTS: Post[] = [
  {
    slug: "welcome-to-ayiti-2075-blog",
    title: "Welcome to the Ayiti 2075 Blog",
    date: "2025-01-14",
    summary:
      "Why this blog exists, how it supports the Nouvo Ayiti 2075 vision, and what kind of updates you will find here.",
    content: `Welcome to the Nouvo Ayiti 2075 blog — a home for ideas, progress,
and the living heartbeat of a nation transforming itself.

Here, we’ll share project updates, reflections from the field, and stories
from partners and communities working to restore Haiti with dignity and hope.`,
    coverImage: "/images/nouvoayiti2075-logo.png",
  },
];

// Optional locale arg for future i18n – we ignore it for now but keep it typed.
export function getAllPosts(locale?: string): Post[] {
  void locale; // mark param as "used" for eslint
  return POSTS;
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
