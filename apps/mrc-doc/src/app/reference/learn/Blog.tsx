"use client";

import { useEffect } from "react";

export default function Blog() {
  useEffect(() => {
    console.log("useEffect");

    return () => {
      console.log("unmount useEffect");
    };
  });
  return <div>Blog</div>;
}
