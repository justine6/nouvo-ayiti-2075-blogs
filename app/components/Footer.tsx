import Link from "next/link";

type FooterProps = {
  dict?: {
    copyright?: string;
    links?: {
      privacy?: string;
      terms?: string;
    };
    wipMessage?: string;
    developedBy?: string;
  };
};

export default function Footer({ dict = {} }: FooterProps) {
  const warn = (path: string, value: string | undefined, fallback: string) => {
    if (process.env.NODE_ENV === "development" && !value) {
      console.warn(
        `⚠️ Missing translation for Footer.${path}, using fallback "${fallback}"`
      );
    }
    return value ?? fallback;
  };

  return (
    <footer className="bg-gray-100 mt-12 py-10 border-t">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 space-y-6">

        <p className="text-gray-800 font-medium">
          {warn(
            "wipMessage",
            dict.wipMessage,
            "🚧 This platform is actively being built. Thank you for your patience!"
          )}
        </p>

        <p className="text-gray-700">
          {warn(
            "developedBy",
            dict.developedBy,
            "Developed with ❤️ by Justine Longla T-Lane"
          )}
        </p>

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
