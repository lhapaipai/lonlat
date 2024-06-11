import clsx from "clsx";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ProgressBar from "~/components/ProgressBar";
import "~/main.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

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
      <body className={clsx(nunito.variable, "font-sans")}>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
