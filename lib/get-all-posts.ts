// lib/get-all-posts.ts

// Shape of a post used by the blog list & detail pages
export interface Post {
  slug: string;
  title: string;
  date: string; // ISO string
  summary: string;
  content: string;
}

// Static list of posts for now.
// Later we can swap this to real markdown/MDX.
const POSTS: Post[] = [
  {
    slug: "welcome-to-ayiti-2075-blog",
    title: "Welcome to the Ayiti 2075 Blog",
    date: "2025-01-13",
    summary:
      "Why this blog exists, how it supports the Nouvo Ayiti 2075 vision, and what kind of updates you will find here.",
    content: `Welcome to the Nouvo Ayiti 2075 blog — a home for ideas, progress, and the living heartbeat of a nation transforming itself.

Here, we'll share project updates, reflections from the field, and stories from partners and communities working to restore Haiti with dignity and hope.`,
  },
  {
    slug: "from-vision-to-project-pillars",
    title: "From Vision to Project Pillars",
    date: "2025-01-27",
    summary:
      "How the big dream of a renewed Haiti turns into concrete pillars like water, education, healthcare, and infrastructure.",
    content: `The 2075 horizon is a bold one — but it only becomes real when we translate vision into practical pillars.

In this post, we explore how core areas like clean water, education, healthcare, and infrastructure form the backbone of the Nouvo Ayiti 2075 movement.`,
  },
  {
    slug: "how-to-walk-with-us-on-the-journey-to-2075",
    title: "How to Walk With Us on the Journey to 2075",
    date: "2025-02-03",
    summary:
      "Simple ways to stay connected, share the vision, and support the work — even from far away.",
    content: `Not everyone can be physically present in Haiti — but everyone can play a part.

Here are practical ways to stay connected, encourage the team, and help keep the 2075 vision alive in your own community.`,
  },
];

// --- Public helpers ---

// All posts, newest first
export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Just the slugs (for generateStaticParams)
export function getAllPostSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

// Single post lookup (for the detail page)
export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
