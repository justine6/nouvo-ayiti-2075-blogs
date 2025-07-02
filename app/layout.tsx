
// app/layout.tsx
import '../src/app/globals.css';


import { ReactNode } from 'react';

export const metadata = {
  title: 'Nouvo Ayiti 2075 Blog',
  description: 'Official content for Nouvo Ayiti 2075 Foundation',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
