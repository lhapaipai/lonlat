import { Href, Button } from "~design";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Href,
  title: "Components/Href",
} satisfies Meta<typeof Href>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    href: "#",
    children: "Lonlat",
    ghost: false,
  },
};

export const Context = () => (
  <>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived.{" "}
      <Href href="#">Visit the Lonlat website</Href>, not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <h2>Href versus Button</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text{" "}
      <Button color="primary" variant="underline">
        button component
      </Button>{" "}
      ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived. <Href href="#">href component</Href>, not only{" "}
      <Button variant="underline">button component</Button> five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
      the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <h2>With ghost</h2>
    <p>
      There is a{" "}
      <Href ghost={true} href="#">
        ghost
      </Href>{" "}
      link.
    </p>
  </>
);
