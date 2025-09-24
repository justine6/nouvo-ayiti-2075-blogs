// A single author structure for posts
export type Author = {
  name: string;
  picture: string;
};

// Full structure for posts (with localization support)
export type PostType = {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  coverImage: string;
  content: string;
  preview: boolean;
  locale: string; // ✅ NEW: always track the post's language
  tags?: string[]; // ✅ Optional tags for categorization
};

// Params shape for dynamic routes
export type Params = {
  slug: string;
  locale: string; // ✅ NEW: include locale for localized routes
};
