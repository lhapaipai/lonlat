import { ThemeColor } from "~/types.d";
import { Meta } from "@storybook/react";
import { useState } from "react";

import { Button, ButtonGroup } from "../button";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;
export default meta;

const buttonLabels = ["one", "two", "three"];
const colors: ThemeColor[] = ["yellow", "gray", "blue", "red"];
const variants = ["contained", "light", "outlined", "text"] as const;
const directions = ["horizontal", "vertical"] as const;
export const Context = () => {
  const [val, setVal] = useState("one");
  return (
    <div className="grid grid-cols-1 gap-8">
      {directions.map((direction) => (
        <div className="flex flex-col gap-4">
          {variants.map((variant) => (
            <div key={variant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {colors.map((color) => (
                <ButtonGroup key={color} direction={direction}>
                  {buttonLabels.map((label) => (
                    <Button
                      variant={variant}
                      color={color}
                      key={label}
                      selected={val === label}
                      onClick={() => setVal(label)}
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
