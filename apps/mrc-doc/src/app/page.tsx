import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Maplibre React Components</h1>
        <div className="flex flex-col">
          <Link href="/getting-started">Getting started</Link>
          <Link href="/tutorial">Tutorial</Link>
        </div>
      </div>
    </main>
  );
}
