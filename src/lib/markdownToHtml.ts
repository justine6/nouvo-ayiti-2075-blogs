/**
 * Legacy markdown-to-HTML helper.
 * The new blog does not depend on remark; this stub simply echoes the input.
 */
export default async function markdownToHtml(markdown: string): Promise<string> {
  return markdown;
}
