// components/PageHeading.tsx
type PageHeadingProps = {
  children: React.ReactNode;
};

export default function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-center text-gray-900">
      {children}
    </h1>
  );
}







