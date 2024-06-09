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
          <Link href="/reference/rmap">RMap</Link>
          <Link href="/reference/rsource">RSource</Link>
          <Link href="/reference/rlayer">RLayer</Link>
          <Link href="/reference/rmarker">RMarker</Link>
          <Link href="/reference/usercontrol">useRControl</Link>
          <Link href="/faq">faq</Link>
          <Link href="/reference/learn">Learn</Link>
        </nav>
        <div className="prose prose-neutral">{children}</div>
      </body>
    </html>
  );
}
