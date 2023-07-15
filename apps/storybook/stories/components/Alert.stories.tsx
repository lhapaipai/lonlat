import { Alert } from "@lonlat/components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "primary",
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod consequatur exercitationem delectus ad quibusdam ipsa officia consectetur laboriosam perspiciatis beatae incidunt sequi, velit sint aspernatur? Aliquid eum culpa cum.",
    className: "",
  },
};

const types = ["primary", "success", "info", "warning", "danger", "weak"] as const;

export const Context = () => (
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
