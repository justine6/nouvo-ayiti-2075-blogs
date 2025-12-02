"use client";

type BlogSectionProps = {
  dict: Record<string, string>;
  fallback?: string;
};

export default function BlogSection({ dict, fallback = "" }: BlogSectionProps) {
  return (key: string): string => {
    const safeKey = String(key); // ensure key is always a string

    if (process.env.NODE_ENV === "development" && !dict[safeKey]) {
      console.warn(
        `⚠️ Missing translation for BlogSection.${safeKey}, using fallback "${fallback}"`
      );
    }

    return dict[safeKey] ?? fallback;
  };
}
