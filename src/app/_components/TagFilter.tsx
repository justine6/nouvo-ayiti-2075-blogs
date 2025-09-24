"use client";

import { useState } from "react";

type TagFilterProps = {
  allTags: string[];
  activeTag: string | null;
  onTagSelect: (tag: string | null) => void;
};

export default function TagFilter({
  allTags,
  activeTag,
  onTagSelect,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded-full border text-sm transition-all ${
            activeTag === tag
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          #{tag}
        </button>
      ))}

      {/* Clear Button */}
      {activeTag && (
        <button
          onClick={() => onTagSelect(null)}
          className="ml-2 px-3 py-1 text-sm rounded-full text-red-600 border border-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-all"
        >
          Clear Filter ✕
        </button>
      )}
    </div>
  );
}
