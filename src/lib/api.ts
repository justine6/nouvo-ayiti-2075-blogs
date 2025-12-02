export type PostType = {
  slug: string;
  title?: string;
  date?: string;
  excerpt?: string;
  content?: string;
};

/**
 * Legacy stub: returns an empty list.
 * The new blog uses app/lib/get-all-posts.ts instead.
 */
export function getAllPosts(): PostType[] {
  return [];
}
