"use client";

import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/" className="hover:underline flex items-center">
          <Image
            src="/images/nouvoayiti2075-logo.png"
            alt="Nouvo Ayiti 2075 Blog Logo"
            width={70}
            height={70}
            className="mr-3"
          />
          Nouvo Ayiti 2075 Blogs
        </Link>
      </h1>

      <h4 className="text-lg md:text-xl text-center md:text-left mt-5 md:pl-8 text-gray-800 dark:text-gray-200">
        A blog about rebuilding hope and empowering communities in{" "}
        <Link
          href="https://nouvoayiti2075.com"
          className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Nouvo Ayiti 2075
        </Link>
        .
      </h4>
    </section>
  );
}
