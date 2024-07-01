import { ResizeArea } from "~/components/resize-area";
import { useRef } from "react";

export default function Extra() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex-[0_0_clamp(10vh,var(--sidebar-extra-height),50vw)] border-t border-gray-4"
    >
      <ResizeArea name="extra" position="top" container={containerRef} />
      <div>extra content zone</div>
    </div>
  );
}
