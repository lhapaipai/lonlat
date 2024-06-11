"use client";

import Link from "next/link";

export default function HeaderBar() {
  return (
    <header className="flex h-16 items-center bg-red-1">
      <Link className="ml-auto" href="https://github.com/lhapaipai/lonlat">
        Github
      </Link>
    </header>
  );
}
