"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FloatingOverlay } from "@floating-ui/react";

const links = [
  {
    url: "/getting-started",
    title: "Getting Started",
  },
  {
    url: "/tutorial",
    title: "Tutorial",
  },
  {
    url: "/components/rmap",
    title: "RMap",
  },
  {
    url: "/components/rsource",
    title: "RSource",
  },
  {
    url: "/components/rlayer",
    title: "RLayer",
  },
  {
    url: "/components/rmarker",
    title: "RMarker",
  },
  {
    url: "/hooks/usercontrol",
    title: "useRControl",
  },
  {
    url: "/hooks/usecontrol",
    title: "useControl",
  },
  {
    url: "/tips",
    title: "Tips",
  },
];

export default function NavBar() {
  const [showNavBar, setShowNavBar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowNavBar(false);
  }, [pathname]);

  return (
    <>
      <button
        className="absolute left-0 top-0 z-10 bg-blue-1 md:hidden"
        onClick={() => setShowNavBar((s) => !s)}
      >
        Menu
      </button>
      <FloatingOverlay
        className={clsx(
          "z-20 bg-yellow-3/20 md:hidden",
          !showNavBar && "hidden",
        )}
        onClick={() => {
          console.log("click floating overlay");
          setShowNavBar(false);
        }}
      />
      <div
        className={clsx(
          "fixed left-0 top-0 z-30 h-screen w-64 max-w-full flex-none overflow-y-auto overflow-x-hidden bg-gray-1 md:flex md:flex-col",
          !showNavBar && "hidden",
        )}
      >
        <button
          className="absolute right-0 top-0 bg-blue-1 md:hidden"
          onClick={() => setShowNavBar(false)}
        >
          Close
        </button>
        <nav className="flex flex-col">
          <Link href="/">MapLibre React Components</Link>
          {links.map(({ url, title }) => (
            <Link href={url} key={url}>
              {title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
