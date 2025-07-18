export type Author = {
  name: string;
  picture: string;
};

export type PostType = {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  coverImage: string;
  content: string;
  preview: boolean;
  tags?: string[]; // ✅ Add this line to support tags
};

export type Params = {
  slug: string;
};
