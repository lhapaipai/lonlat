import { Flash } from "~design";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Flash",
  component: Flash,
} satisfies Meta<typeof Flash>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    color: "primary",
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod consequatur exercitationem delectus ad quibusdam ipsa officia consectetur laboriosam perspiciatis beatae incidunt sequi, velit sint aspernatur? Aliquid eum culpa cum.",
    className: "",
  },
};

const colors = ["primary", "success", "info", "warning", "danger", "weak"] as const;

export const Context = () => (
  <div className="flex flex-column gap-2">
    {colors.map((color) => (
      <Flash key={color} color={color}>
        There is a plant seed on its back right from the day this Pokémon is born. The seed slowly
        grows larger. There is a plant seed on its back right from the day this Pokémon is born. The
        seed slowly grows larger. There is a plant seed on its back right from the day this Pokémon
        is born. The seed slowly grows larger.
      </Flash>
    ))}
  </div>
);
