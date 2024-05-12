import { Code } from "~design";

export default {
  title: "Styles",
};

export const Shadow = () => {
  const shadows = [
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
    "shadow-inner",
  ];

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        marginBottom: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      }}
    >
      {shadows.map((s) => (
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
  );
};
