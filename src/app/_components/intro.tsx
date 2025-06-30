import Image from 'next/image';
import Link from 'next/link';

// Keep this import if it was already there and CMS_NAME is used elsewhere.
// If you are NOT using CMS_NAME anywhere else in your project, you can remove this line.
import { CMS_NAME } from '@/lib/constants';

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/" className="hover:underline flex items-center">
          {/* CORRECTED: The src attribute is now all lowercase to match your file */}
          <Image
            src="/images/nouvoayiti2075-logo.png" // <--- THIS IS THE CRITICAL CORRECTION
            alt="Nouvo Ayiti 2075 Blog Logo"
            width={70}
            height={70}
            className="mr-3"
          />
          Nouvo Ayiti 2075 Blogs
        </Link>
      </h1>
      {/* This is the description paragraph. You can modify or remove it if you wish. */}
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A blog about rebuilding hope and empowering communities in{' '}
        <Link
          href="https://nouvoayiti2075.com" // You can change this to your main website URL if you have one
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Nouvo Ayiti 2075
        </Link>
        .
      </h4>
    </section>
  );
}