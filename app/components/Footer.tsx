// components/Footer.tsx

type FooterProps = {
  dict?: {
    rights?: string;
    poweredBy?: string;
  };
};

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="p-4 bg-gray-200 text-center">
      <p>{dict?.rights}</p>
      <p>{dict?.poweredBy}</p>
    </footer>
  );
}
