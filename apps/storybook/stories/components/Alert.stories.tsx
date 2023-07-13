import { Alert } from "@lonlat/components";

export default {
  title: "Components/Alert",
  component: Alert,
};

const types = ["primary", "success", "info", "warning", "danger", "weak"] as const;

export const Basic = () => (
  <div className="flex flex-column gap-2">
    {types.map((type) => (
      <Alert key={type} type={type}>
        There is a plant seed on its back right from the day this Pokémon is born. The seed slowly
        grows larger. There is a plant seed on its back right from the day this Pokémon is born. The
        seed slowly grows larger. There is a plant seed on its back right from the day this Pokémon
        is born. The seed slowly grows larger.
      </Alert>
    ))}
  </div>
);
