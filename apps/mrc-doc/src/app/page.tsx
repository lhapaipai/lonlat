import Link from "next/link";
import LandingBackground from "~/components/LandingBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>
          Maplibre React Components <i className="fe-heart"></i>
        </h1>
        <LandingBackground />
        <div className="flex flex-col">
          <Link href="/getting-started">Getting started</Link>
          <Link href="/tutorial">Tutorial</Link>
        </div>
      </div>
    </main>
  );
}
