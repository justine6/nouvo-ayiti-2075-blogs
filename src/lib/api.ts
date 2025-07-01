import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPostBySlug(locale: string, slug: string) {
  const filePath = path.join(process.cwd(), 'src/app/content/articles', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    ...data,
    content,
    slug,
  };
}
