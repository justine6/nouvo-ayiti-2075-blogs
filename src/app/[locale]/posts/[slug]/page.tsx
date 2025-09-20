// app/[locale]/posts/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const locales = ['en', 'fr', 'ht', 'es'];
  const fs = require('fs');
  const path = require('path');

  const params = locales.flatMap((locale) => {
    const postsDir = path.join(process.cwd(), 'content', 'posts', locale);
    if (!fs.existsSync(postsDir)) return [];
    return fs.readdirSync(postsDir)
      .filter((file: string) => file.endsWith('.mdx'))
      .map((filename: string) => ({
        locale,
        slug: filename.replace(/\.mdx$/, ''),
      }));
  });

  return params;
}

export default async function PostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'posts', locale, `${slug}.mdx`);

  if (!existsSync(filePath)) notFound();

  const fileContent = readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content, { scope: data });

  return (
    <article className="prose prose-lg mx-auto px-4 py-8">
      <h1>{data.title}</h1>
      <p className="text-gray-500 text-sm">{data.date}</p>
      <MDXRemote source={mdxSource} />
    </article>
  );
}
