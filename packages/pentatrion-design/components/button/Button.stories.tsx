import type { Meta, StoryObj, ReactRenderer } from "@storybook/react";
import { PartialStoryFn } from "@storybook/types";

import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../table";

import { Button } from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["contained", "light", "outlined", "text", "ghost"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["yellow", "gray", "red", "orange", "green", "blue"],
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-1 p-4">
        <Story />
      </div>
    ),
  ] as ((story: PartialStoryFn<ReactRenderer, any>) => JSX.Element)[],
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "contained",
    size: "medium",
    color: "yellow",
    children: "My button",
    loading: undefined,
    disabled: false,
    fullWidth: false,
    selected: false,
    withRipple: false,
  },
};

const variants = ["contained", "light", "outlined", "text", "ghost"] as const;
const colors = ["yellow", "gray", "red", "orange", "green", "blue"] as const;

export const Context = () => {
  return (
    <div>
      hello
      <a href="#">link</a>
      world
      <button>normal button</button>
      <span tabIndex={0}>tab</span>
      index
      <h3 className="mt-8">Sizes</h3>
      <div className="flex gap-2 items-center">
        <Button size="small">small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </div>
      <h3 className="mt-8">Variants</h3>
      <div className="flex gap-2">
        <Button variant="contained">solid</Button>
        <Button variant="light">light</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>
        <Button variant="ghost">ghost</Button>
      </div>
      <h3 className="mt-8">States</h3>
      <div className="flex gap-2 items-center">
        <Button disabled={true}>disabled</Button>
        <Button loading={false}>isLoading false</Button>
        <Button loading={true}>isLoading true</Button>
      </div>
      <h3 className="mt-8">Default state</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <></>
            </TableHeaderCell>
            {colors.map((color) => (
              <TableHeaderCell key={color}>{color}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant}>
              <TableCell>{variant}</TableCell>
              {colors.map((color) => (
                <TableCell key={color} label={color}>
                  <div className="flex gap-2">
                    <Button variant={variant} color={color}>
                      Lorem
                    </Button>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3 className="mt-8">Only Selected state</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <></>
            </TableHeaderCell>
            {colors.map((color) => (
              <TableHeaderCell key={color}>{color}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant}>
              <TableCell>{variant}</TableCell>
              {colors.map((color) => (
                <TableCell key={color} label={color}>
                  <div className="flex gap-2">
                    <Button selected variant={variant} color={color}>
                      Lorem
                    </Button>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3 className="mt-8">Icons</h3>
      <div className="flex items-center gap-4 mb-4">
        <Button icon variant="contained" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="outlined" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="text" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="ghost" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button variant="contained" color="gray" icon>
          <i className="fe-cancel"></i>
          <span>Cancel</span>
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Button icon variant="contained">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="outlined">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="text">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="ghost">
          <i className="fe-cancel"></i>
        </Button>
        <Button variant="contained" icon>
          <i className="fe-cancel"></i>
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};
