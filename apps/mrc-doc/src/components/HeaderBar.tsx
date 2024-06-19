"use client";

import { Toggle } from "pentatrion-design/components/input";
import LinkButton from "./LinkButton";
import { useDarkMode } from "~/hooks/useDarkMode";
import MapLibreReactLogo from "./MapLibreReactLogo";
import Link from "next/link";
export default function HeaderBar() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  return (
    <header className="flex h-12 items-center">
      <Link href="/" className="ml-12 place-content-center md:ml-0">
        <span className="block md:hidden">
          <MapLibreReactLogo height={42} />
        </span>
        <span className="hidden font-title text-2xl md:block">
          <span>
            Map<span className="text-[#99bfea]">Libre</span>
          </span>{" "}
          React Components
        </span>
      </Link>
      <span className="ml-auto">
        <Toggle
          checked={isDarkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </span>
      <LinkButton
        variant="text"
        color="gray"
        icon
        size="large"
        href="https://github.com/lhapaipai/lonlat"
      >
        <i className="fe-github text-3xl"></i>
      </LinkButton>
    </header>
  );
}
