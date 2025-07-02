import Image from 'next/image';

export default function Home() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <Image
        src="/images/blog/mission-banner.png"
        alt="Map of Haiti"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
          Nouvo Ayiti 2075 — Restoring Dignity
        </h1>
      </div>
    </section>
  );
}
