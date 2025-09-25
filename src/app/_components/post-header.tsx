"use client";

import { User, Calendar } from "lucide-react";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>

      {/* Large-screen Avatar - optional */}
      <div className="hidden md:block md:mb-12">
        <img
          src={author.picture}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-full hover:scale-105 transition-transform duration-300 shadow"
        />
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>

      {/* 👤 Unified Byline Section */}
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-black dark:hover:text-white">
          {/* Avatar */}
          <img
            src={author.picture}
            alt={author.name}
            width={32}
            height={32}
            className="rounded-full hover:scale-105 transition-transform duration-300 shadow-sm"
          />

          {/* Author and Date */}
          <div className="flex items-center space-x-1">
            <User size={16} className="text-blue-600 dark:text-blue-400" />
            <span>By {author.name}</span>
            <span className="mx-1 text-gray-400">|</span>
            <Calendar
              size={16}
              className="text-green-600 dark:text-green-400"
            />
            <span>
              <DateFormatter dateString={date} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}





