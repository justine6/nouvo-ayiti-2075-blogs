import { Author } from "./author";

export interface Post {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  coverImage: string;
}
