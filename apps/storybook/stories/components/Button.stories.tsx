import type { Meta } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "@lonlat/components";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {},
} satisfies Meta<typeof Button>;

export default meta;

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

const shapes = ["solid", "outline", "ghost", "underline"] as const;
const types = ["primary", "weak", "danger", "warning", "success", "info"] as const;

export const Variants = () => {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <></>
            </TableHeaderCell>
            {types.map((type) => (
              <TableHeaderCell key={type}>{type}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {shapes.map((shape) => (
            <TableRow key={shape}>
              <TableCell>{shape}</TableCell>
              {types.map((type) => (
                <TableCell key={type} label={type}>
                  <div className="flex gap-2">
                    <Button shape={shape} type={type}>
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
