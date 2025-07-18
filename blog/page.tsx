'use client';

import { useState } from 'react';
import SearchInput from '@/app/_components/SearchInput';
import BlogCard from '@/app/_components/BlogCard';
import TagFilter from '@/app/_components/TagFilter';
import type { PostType } from '@/interfaces/post';

type Props = {
  allPosts: PostType[];
};

export default function BlogPage({ allPosts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags ?? []))
  ).sort();

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>

      <SearchInput onSearch={setSearchQuery} />

      <TagFilter
        allTags={allTags}
        activeTag={selectedTag}
        onTagSelect={setSelectedTag}
      />

      {/* Filter Info Banner */}
      {selectedTag && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4 bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-100 px-4 py-3 rounded-md shadow-sm">
          <span>
            🎯 <span className="font-semibold">Showing posts tagged:</span>{' '}
            <span className="italic">#{selectedTag}</span>
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className="text-sm text-blue-700 dark:text-blue-200 hover:underline underline-offset-2"
          >
            ✕ Clear filter
          </button>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              {...post}
              onTagClick={(tag) =>
                setSelectedTag((prev) => (prev === tag ? null : tag))
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No matching posts found.</p>
      )}
    </div>
  );
}
