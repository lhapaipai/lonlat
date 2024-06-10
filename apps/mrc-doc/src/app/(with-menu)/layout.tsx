import Link from "next/link";

export default function WithMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:pl-64">
      <div className="fixed left-0 top-0 hidden h-full w-64 flex-none overflow-y-auto overflow-x-hidden bg-gray-1 md:flex md:flex-col">
        <nav className="flex flex-col">
          <Link href="/">Home</Link>
          <Link href="/getting-started">Getting started</Link>
          <Link href="/tutorial">Tutorial</Link>
          <div>
            <div>Components</div>
            <div className="flex flex-col">
              <Link href="/components/rmap">RMap</Link>
              <Link href="/components/rsource">RSource</Link>
              <Link href="/components/rlayer">RLayer</Link>
              <Link href="/components/rmarker">RMarker</Link>
            </div>
          </div>
          <div>
            <div>Hooks</div>
            <div className="flex flex-col">
              <Link href="/hooks/usercontrol">useRControl</Link>
              <Link href="/hooks/usecontrol">useControl</Link>
            </div>
          </div>
          <Link href="/tips">Tips</Link>
        </nav>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
          quam veniam dolores, facere, in reiciendis iure fugiat placeat,
          laudantium rem cumque similique commodi deserunt possimus hic ipsa
          iusto accusantium temporibus.
        </div>
      </div>
      <div className="relative bg-green-1">
        <header className="h-16 bg-red-1 md:hidden">
          <button>=</button>
          Mobile Nav
        </header>
        <div className="p-4">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
