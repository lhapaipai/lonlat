export default {
  title: "Styles/Themes",
};

export const TextColors = () => {
  const colors = ["gray", "yellow", "green", "blue", "orange", "red"];

  return (
    <div className="grid mt-4 grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] sm:grid-cols-1 gap-8">
      {colors.map((color) => (
        <div key={color}>
          <div className="text-sm font-semibold">{color}</div>
          <div className="grid mt-2 grid-cols-1 sm:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((variant) => (
              <div className="">
                <div
                  className="h-10 w-10 sm:w-full rounded"
                  style={{ backgroundColor: `rgb(var(--color-${color}-${variant}))` }}
                ></div>
                <div className="px-0.5">
                  <div className="w-6 font-medium text-xs">{variant}</div>
                  <div className="text-xs font-mono">{`--color-${color}-${variant}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
