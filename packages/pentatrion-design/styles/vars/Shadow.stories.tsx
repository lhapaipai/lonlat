import { Code } from "pentatrion-design";

export default {
  title: "Styles",
};

export const Shadow = () => {
  const lightShadows = [
    "shadow-light-sm",
    "shadow-light",
    "shadow-light-md",
    "shadow-light-lg",
    "shadow-light-xl",
    "shadow-light-2xl",
    "shadow-light-inner",
  ];
  const shadows = [
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
    "shadow-inner",
  ];

  const btnShadows = ["shadow-btn", "shadow-btn-focus", "shadow-btn-hover", "shadow-btn-active"];
  return (
    <>
      {[lightShadows, shadows, btnShadows].map((shadowGroup, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gap: "2rem",
            marginBottom: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          }}
        >
          {shadowGroup.map((s) => (
            <div
              key={s}
              style={{
                boxShadow: `var(--${s})`,
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Code>var(--{s})</Code>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
