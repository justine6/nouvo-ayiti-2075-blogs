type FooterProps = {
  dict?: {
    copyright?: string;
  };
};

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="p-4 text-center bg-gray-100 border-t">
      <p>{dict?.copyright ?? " Nouvo Ayiti 2075. All rights reserved."}</p>
    </footer>
  );
}
