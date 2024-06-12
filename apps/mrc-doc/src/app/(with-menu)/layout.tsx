import HeaderBar from "~/components/HeaderBar";
import NavBar from "~/components/NavBar";

import "maplibre-react-components/dist/maplibre-mrc.css";

export default function WithMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:pl-64">
      <NavBar />
      <div className="relative overflow-x-hidden">
        <HeaderBar />
        <div className="p-4">
          <div className="prose prose-neutral dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
