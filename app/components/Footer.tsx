import Link from "next/link";

type FooterProps = {
  dict?: {
    copyright?: string;
    links?: {
      privacy?: string;
      terms?: string;
    };
  };
};

export default function Footer({ dict = {} }: FooterProps) {
  const warn = (path: string, value: string | undefined, fallback: string) => {
    if (process.env.NODE_ENV === "development" && !value) {
      console.warn(
        `⚠️ Missing translation for Footer.${path}, using fallback "${fallback}"`,
      );
    }
    return value ?? fallback;
  };

  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
        <p>{warn("copyright", dict.copyright, "All rights reserved.")}</p>

        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy" className="hover:underline">
            {warn("links.privacy", dict.links?.privacy, "Privacy Policy")}
          </Link>

          <Link href="/terms" className="hover:underline">
            {warn("links.terms", dict.links?.terms, "Terms of Service")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
