"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FloatingOverlay } from "@floating-ui/react";
import { Button } from "pentatrion-design/components/button";
import MapLibreReactLogo from "./MapLibreReactLogo";
import LinkButton from "./LinkButton";
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
      <div className="absolute left-0 top-0 z-10 md:hidden">
        <Button
          icon
          onClick={() => setShowNavBar((s) => !s)}
          color="gray"
          variant="text"
          size="large"
        >
          <i className="fe-menu"></i>
        </Button>
      </div>
      <FloatingOverlay
        className={clsx("z-20 md:hidden", !showNavBar && "hidden")}
        onClick={() => {
          console.log("click floating overlay");
          setShowNavBar(false);
        }}
      />
      <div
        className={clsx(
          "fixed left-0 top-0 z-30 h-screen w-64 max-w-full flex-none overflow-y-auto overflow-x-hidden md:flex md:flex-col",
          !showNavBar && "hidden",
        )}
      >
        <div className="absolute right-0 top-0 md:hidden">
          <Button
            icon
            onClick={() => setShowNavBar(false)}
            color="gray"
            variant="text"
            size="large"
          >
            <i className="fe-cancel"></i>
          </Button>
        </div>

        <nav className="flex flex-col">
          <Link href="/" className="grid min-h-32 place-content-center">
            <MapLibreReactLogo height={100} />
          </Link>
          {links.map(({ url, title }) => (
            <LinkButton variant="text" color="gray" href={url} key={url}>
              {title}
            </LinkButton>
          ))}
        </nav>
      </div>
    </>
  );
}
