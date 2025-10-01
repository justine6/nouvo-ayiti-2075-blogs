export type TopbarDictionary = {
  home?: string;
  about?: string;
  projects?: string;
  blog?: string;
  contact?: string;
  vision?: string;
  language?: string;
};

export type FooterDictionary = {
  copyright?: string;
};

export type HeroDictionary = {
  readMore?: string;
};

export type MoreStoriesDictionary = {
  title?: string;
  readMore?: string;
};

export type Dictionary = {
  topbar: TopbarDictionary;
  footer: FooterDictionary;
  hero: HeroDictionary;
  moreStories: MoreStoriesDictionary;
};
