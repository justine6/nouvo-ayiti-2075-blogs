export type Locale = "en" | "fr" | "ht" | "es";

/**
 * Shape of the translation dictionary used in the blog site.
 * We keep an index signature so extra keys don’t cause type errors.
 */
export interface BlogDictionary {
  blogSection?: {
    title?: string;
    subtitle?: string;
    viewAll?: string;
    blogUnavailable?: string;
    readMore?: string;
  };
  postPage?: {
    backToBlog?: string;
    publishedOn?: string;
  };
  common?: {
    languageName?: string;
  };

  // Allow additional sections/keys without compiler drama
  [key: string]: unknown;
}
