import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "~design";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "outline", "text", "ghost", "underline"],
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
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "solid",
    size: "medium",
    color: "yellow",
    children: "My button",
    loading: false,
    disabled: false,
    fullWidth: false,
    selected: false,
    withRipple: false,
  },
};

export const Variants = () => (
  <div className="flex gap-2">
    <Button variant="solid">solid</Button>
    <Button variant="outline">outline</Button>
    <Button variant="underline">underline</Button>
    <Button variant="text">text</Button>
    <Button variant="ghost">ghost</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-2" style={{ alignItems: "center" }}>
    <Button size="small">small</Button>
    <Button size="medium">medium</Button>
    <Button size="large">large</Button>
  </div>
);

export const States = () => (
  <div className="flex gap-2" style={{ alignItems: "center" }}>
    <Button disabled={true}>disabled</Button>
    <Button loading={true}>isLoading</Button>
  </div>
);

export const Icons = () => (
  <div className="flex gap-2" style={{ alignItems: "center" }}>
    <Button icon variant="solid" color="gray">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="outline" color="gray">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="text" color="gray">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="ghost" color="gray">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="underline" color="gray">
      <i className="fe-cancel"></i>
    </Button>
    <Button variant="solid" color="gray" className="with-icon with-prefix">
      <i className="fe-cancel"></i>
      Cancel
    </Button>
  </div>
);

const variants = ["solid", "outline", "light", "text", "ghost", "underline"] as const;
const colors = ["yellow", "gray", "red", "orange", "green", "blue"] as const;

export const Context = () => {
  return (
    <div style={{ backgroundColor: "transparent" }}>
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

      <h3>Icons</h3>

      <div className="flex gap-2" style={{ alignItems: "center" }}>
        <Button icon variant="solid" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="outline" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="text" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="ghost" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="underline" color="gray">
          <i className="fe-cancel"></i>
        </Button>
        <Button variant="solid" color="gray" className="with-icon with-prefix">
          <i className="fe-cancel"></i>
          Cancel
        </Button>
      </div>

      <div className="flex gap-2" style={{ alignItems: "center" }}>
        <Button icon variant="solid">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="outline">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="text">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="ghost">
          <i className="fe-cancel"></i>
        </Button>
        <Button icon variant="underline">
          <i className="fe-cancel"></i>
        </Button>
        <Button variant="solid" className="with-icon with-prefix">
          <i className="fe-cancel"></i>
          Cancel
        </Button>
      </div>

      <h3>Selected</h3>

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
    </div>
  );
};
