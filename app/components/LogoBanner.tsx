// components/LogoBanner.tsx
import Image from "next/image";

export default function LogoBanner() {
  return (
    <section className="w-full flex justify-center py-6 bg-white shadow-sm">
      <Image
        src="/images/nouvoayiti2075-logo.png"
        alt="Nouvo Ayiti 2075 Logo"
        width={240}
        height={240}
        priority
        className="object-contain"
      />
    </section>
  );
}







