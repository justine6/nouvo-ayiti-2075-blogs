import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts(locale: string) {
  const dirPath = path.join(process.cwd(), 'src/app/content/articles', locale);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.mdx'));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(dirPath, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      ...data,
      slug,
    };
  });
}
