import Image from "next/image";
import React from "react";

// 🎥 YouTube embed component
export function YouTube({ id }: { id: string }) {
  return (
    <div className="aspect-w-16 aspect-h-9 my-6">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg shadow"
      />
    </div>
  );
}

// 📝 Callout box
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-md">
      {children}
    </div>
  );
}

// 🖼️ Images in MDX
export function MdxImage(props: any) {
  return (
    <Image
      alt={props.alt || ""}
      src={props.src}
      width={800}
      height={500}
      className="rounded-lg my-6 shadow"
    />
  );
}

// ✨ Global layout wrapper (applies to all MDX)
export function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <article
      className="
        prose prose-lg max-w-3xl mx-auto my-12
        prose-headings:font-bold
        prose-a:text-blue-600 hover:prose-a:underline
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-lg prose-pre:shadow
        prose-img:rounded-lg prose-img:shadow
        dark:prose-invert
      "
    >
      {children}
    </article>
  );
}

// 🛠️ Components map passed to MDX compiler
export const mdxComponents = {
  YouTube,
  Note,
  img: MdxImage,
  wrapper: MdxLayout, // wraps all MDX in prose
};
