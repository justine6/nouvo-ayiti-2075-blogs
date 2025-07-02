import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full flex justify-center my-8">
      <Image
        src="/images/blog/mission-banner.png"
        alt="Map of Haiti"
        width={800}
        height={600}
        className="rounded-lg shadow-md"
      />
    </div>
  );
}
