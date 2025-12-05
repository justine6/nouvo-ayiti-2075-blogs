import { redirect } from "next/navigation";

type ProjectSlugPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export default function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  // No individual project pages yet – send users back to the grid.
  redirect(`/${params.locale}/projects`);
}
