import LandingBackground from "~/components/LandingBackground";
import LinkButton from "~/components/LinkButton";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>
          Maplibre React Components <i className="fe-heart"></i>
        </h1>
        <LandingBackground />
        <div className="flex gap-2">
          <LinkButton href="/getting-started">Getting started</LinkButton>
          <LinkButton href="/tutorial">Tutorial</LinkButton>
        </div>
      </div>
    </main>
  );
}
