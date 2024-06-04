import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./main.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maplibre React Components",
  description: "React components for MaplibreGL maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/reference/rmap">Rmap</Link>
          <Link href="/reference/learn">Learn</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
