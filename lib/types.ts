// Types for each translation dictionary section

export type HeroDictionary = {
  title: string;
  subtitle: string;
  readMore: string;
  joinNow: string;
  watchVideos?: string;
};

export type MissionDictionary = {
  heading: string;
  paragraph: string;
};

export type ProjectsDictionary = {
  title: string;
  intro: string;
  motto: string;
  items?: { title: string; description: string }[];
};

export type BlogDictionary = {
  title: string;
  readMore: string;
};

export type NewsletterDictionary = {
  title: string;
  description: string;
  placeholder?: string;
  subscribe?: string;
};

export type ContactDictionary = {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export type VisionDictionary = {
  title: string;
  intro: string;
  content?: string;
};

export type JoinDictionary = {
  title: string;
  subtitle?: string;
  form: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    message?: string;
    submit: string;
  };
};

export type AboutDictionary = {
  heading: string;
  paragraph: string;
};

export type FooterDictionary = {
  contact: string;
  rights: string;
};

// Master dictionary type for a locale
export type SiteDictionary = {
  hero: HeroDictionary;
  mission: MissionDictionary;
  projects: ProjectsDictionary;
  blog?: BlogDictionary;
  newsletter: NewsletterDictionary;
  contact: ContactDictionary;
  vision: VisionDictionary;
  join: JoinDictionary;
  about: AboutDictionary;
  footer: FooterDictionary;
};
