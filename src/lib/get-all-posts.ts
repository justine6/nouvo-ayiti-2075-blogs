export type PostType = {
  slug: string;
  title?: string;
  date?: string;
  excerpt?: string;
  content?: string;
};

/**
 * Legacy stub: the new blog uses app/lib/get-all-posts.ts.
 * This exists only so TypeScript can compile old imports cleanly.
 */
export function getAllPosts(): PostType[] {
  return [];
}
