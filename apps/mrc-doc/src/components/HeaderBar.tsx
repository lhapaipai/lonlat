"use client";

import { Toggle } from "pentatrion-design/components/input";
import LinkButton from "./LinkButton";
import { useDarkMode } from "~/hooks/useDarkMode";
export default function HeaderBar() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  return (
    <header className="flex h-12 items-center justify-end">
      <Toggle
        checked={isDarkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />
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
