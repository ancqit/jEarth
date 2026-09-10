export type GuideTone = 'gold' | 'forest' | 'warn';

export interface GuideBlock {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'callout' | 'table' | 'steps';
  text?: string;
  items?: string[];
  caption?: string;
  headers?: string[];
  rows?: string[][];
  tone?: GuideTone;
}

export interface GuideArticle {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  minutes: number;
  chapter: string;
  blocks: GuideBlock[];
}

export interface SortItem {
  id: string;
  name: string;
  hint: string;
  answer: string;
  why: string;
}

export interface WasteHero {
  country: string;
  region: string;
  score: string;
  headline: string;
  whatTheyDid: string[];
  whatToCopy: string[];
  caution: string;
  iso2: string;
  iso3: string;
  queryName: string;
  wiki: string;
}
