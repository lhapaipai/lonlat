import MapLibreReactLogo from "~/components/MapLibreReactLogo";

export default function HomeLogo() {
  return (
    <div className="flex items-center gap-2 font-title">
      <MapLibreReactLogo height={110} />
      <span className="flex flex-col text-6xl md:min-w-[31rem] md:flex-row md:gap-3">
        <span>
          Map<span className="text-[#99bfea]">Libre</span>
        </span>
        <span className="leading-8 md:leading-[3.75rem]">
          <span className="text-4xl">for</span> React
        </span>
      </span>
    </div>
  );
}
