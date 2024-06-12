"use client";

import LinkButton from "./LinkButton";
export default function HeaderBar() {
  return (
    <header className="flex h-12 items-center justify-end">
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
