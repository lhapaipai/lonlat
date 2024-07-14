import { ResizeArea } from "~/components/resize-area";
import { ReactNode, useRef } from "react";

interface Props {
  children?: ReactNode;
}
export default function Extra({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex-[0_0_clamp(10vh,var(--sidebar-extra-height),50vh)] border-t border-gray-4"
    >
      <ResizeArea name="extra" position="top" container={containerRef} />
      {children}
    </div>
  );
}
