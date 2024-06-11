import HeaderBar from "~/components/HeaderBar";
import NavBar from "~/components/NavBar";

export default function WithMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:pl-64">
      <NavBar />
      <div className="relative overflow-x-hidden bg-green-1">
        <HeaderBar />
        <div className="p-4">
          <div className="prose prose-neutral">{children}</div>
        </div>
      </div>
    </div>
  );
}
