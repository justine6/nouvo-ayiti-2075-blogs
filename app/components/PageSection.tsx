// components/PageSection.tsx
import { ReactNode } from "react";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function PageSection({
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section
      className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}
    >
      {children}
    </section>
  );
}







