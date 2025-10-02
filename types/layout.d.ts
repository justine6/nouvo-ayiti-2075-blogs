import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/settings";
import type { Metadata } from "next";

/**
 * Common props for any layout component
 */
export type LayoutProps = {
  children: ReactNode;
};

/**
 * Props for localized layouts (with locale param)
 */
export type LocaleLayoutProps = LayoutProps & {
  params: { locale: Locale };
};

/**
 * Shared metadata type for layouts
 */
export type DefaultMetadata = Metadata & {
  title: string;
  description: string;
};

/**
 * Mapping of metadata per locale (with OG/Twitter support)
 */
export type LocaleMetadataMap = {
  [locale: string]: {
    title: string;
    description: string;
    openGraph?: {
      title: string;
      description: string;
      images: string[];
    };
    twitter?: {
      card: "summary_large_image" | "summary";
      title: string;
      description: string;
      images: string[];
    };
  };
};
