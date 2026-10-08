export type Writing = "horizontal" | "vertical";

export interface ShinbunConfig {
  site: {
    url: string;
    title: string;
    subtitle?: string;
    description: string;
    author: string;
    lang?: string;
    timezone?: string;
    base?: string;
  };
  writing?: Writing;
  paper?: {
    dan?: number;
    verticalDan?: number;
    fontSize?: string;
  };
  masthead?: {
    left?: string[];
    right?: string[];
  };
  images?: {
    domains?: string[];
  };
  nav?: { label: string; href: string }[];
  socials?: { name: string; url: string }[];
  posts?: {
    perPage?: number;
    columns?: number;
    scheduledMargin?: number;
  };
  features?: {
    darkMode?: boolean;
    archives?: boolean;
    transitions?: boolean;
  };
}

export interface ResolvedConfig {
  site: Required<ShinbunConfig["site"]>;
  writing: Writing;
  paper: Required<NonNullable<ShinbunConfig["paper"]>>;
  masthead: Required<NonNullable<ShinbunConfig["masthead"]>>;
  images: { domains: string[] };
  nav: { label: string; href: string }[];
  socials: { name: string; url: string }[];
  posts: Required<NonNullable<ShinbunConfig["posts"]>>;
  features: Required<NonNullable<ShinbunConfig["features"]>>;
}

export function defineShinbunConfig(config: ShinbunConfig): ShinbunConfig {
  return config;
}

export interface PostData {
  title: string;
  description: string;
  pubDatetime: Date;
  modDatetime?: Date | null;
  draft?: boolean;
  tags: string[];
  writing?: Writing;
}

export interface PostLike {
  id: string;
  data: PostData;
}
