import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "pentatrion-design";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {},
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "solid",
    size: "medium",
    color: "primary",
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
    <Button icon variant="solid" color="weak">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="outline" color="weak">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="text" color="weak">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="ghost" color="weak">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon variant="underline" color="weak">
      <i className="fe-cancel"></i>
    </Button>
  </div>
);

const variants = ["solid", "outline", "text", "ghost", "underline"] as const;
const colors = ["primary", "weak", "danger", "warning", "success", "info"] as const;

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
    </div>
  );
};
