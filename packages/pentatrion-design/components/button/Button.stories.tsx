import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "@lonlat/shared";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {},
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    shape: "solid",
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

export const Shapes = () => (
  <div className="flex gap-2">
    <Button shape="solid">solid</Button>
    <Button shape="outline">outline</Button>
    <Button shape="underline">underline</Button>
    <Button shape="ghost">ghost</Button>
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
    <Button icon shape="solid">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon shape="outline">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon shape="ghost">
      <i className="fe-cancel"></i>
    </Button>
    <Button icon shape="underline">
      <i className="fe-cancel"></i>
    </Button>
  </div>
);

const shapes = ["solid", "outline", "ghost", "underline"] as const;
const colors = ["primary", "weak", "danger", "warning", "success", "info"] as const;

export const Variants = () => {
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
          {shapes.map((shape) => (
            <TableRow key={shape}>
              <TableCell>{shape}</TableCell>
              {colors.map((color) => (
                <TableCell key={color} label={color}>
                  <div className="flex gap-2">
                    <Button shape={shape} color={color}>
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
