// All supported locales
export type Locale = "en" | "fr" | "ht" | "es";

// Shape of each dictionary file
export type HomeDictionary = {
  topbar: {
    home: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
    vision: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    readMore: string;
    joinNow: string;
    watchVideos?: string;
  };
  mission: {
    heading: string;
    paragraph: string;
  };
  newsletter: {
    title: string;
    description: string;
  };
  projects: {
    title: string;
    intro: string;
    motto: string;
  };
};

export type BlogDictionary = {
  title: string;
  subtitle: string;
  readMore: string;
  recentPosts: string;
  noPosts: string;
};

// Combined type for getDictionary return
export type Dictionary = {
  home: HomeDictionary;
  blog: BlogDictionary;
};





