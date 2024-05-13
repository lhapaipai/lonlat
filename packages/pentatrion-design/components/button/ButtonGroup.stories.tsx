import { ButtonGroup, Button } from "~design";
import { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;
export default meta;

export const Context = () => {
  const [val, setVal] = useState("one");
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <Button selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="blue" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button color="blue" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button color="blue" selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outlined" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button variant="outlined" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button variant="outlined" selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            variant="outlined"
            color="gray"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="outlined"
            color="gray"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="outlined"
            color="gray"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="ghost" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button variant="ghost" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button variant="ghost" selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            variant="ghost"
            color="red"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="ghost"
            color="red"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="ghost"
            color="red"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-4" style={{ maxWidth: "400px" }}>
        <ButtonGroup direction="vertical">
          <Button selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup direction="vertical">
          <Button
            variant="outlined"
            color="gray"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="outlined"
            color="gray"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="outlined"
            color="gray"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup direction="vertical">
          <Button
            variant="ghost"
            color="gray"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="ghost"
            color="gray"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="ghost"
            color="gray"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
