import { ButtonGroup, Button } from "@lonlat/shared";
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
    <div className="flex flex-column gap-4">
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
        <Button type="primary" selected={val === "one"} onClick={() => setVal("one")}>
          One
        </Button>
        <Button type="primary" selected={val === "two"} onClick={() => setVal("two")}>
          Two
        </Button>
        <Button type="primary" selected={val === "three"} onClick={() => setVal("three")}>
          Three
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button shape="outline" selected={val === "one"} onClick={() => setVal("one")}>
          One
        </Button>
        <Button shape="outline" selected={val === "two"} onClick={() => setVal("two")}>
          Two
        </Button>
        <Button shape="outline" selected={val === "three"} onClick={() => setVal("three")}>
          Three
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          shape="outline"
          type="primary"
          selected={val === "one"}
          onClick={() => setVal("one")}
        >
          One
        </Button>
        <Button
          shape="outline"
          type="primary"
          selected={val === "two"}
          onClick={() => setVal("two")}
        >
          Two
        </Button>
        <Button
          shape="outline"
          type="primary"
          selected={val === "three"}
          onClick={() => setVal("three")}
        >
          Three
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button shape="ghost" selected={val === "one"} onClick={() => setVal("one")}>
          One
        </Button>
        <Button shape="ghost" selected={val === "two"} onClick={() => setVal("two")}>
          Two
        </Button>
        <Button shape="ghost" selected={val === "three"} onClick={() => setVal("three")}>
          Three
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button shape="ghost" type="primary" selected={val === "one"} onClick={() => setVal("one")}>
          One
        </Button>
        <Button shape="ghost" type="primary" selected={val === "two"} onClick={() => setVal("two")}>
          Two
        </Button>
        <Button
          shape="ghost"
          type="primary"
          selected={val === "three"}
          onClick={() => setVal("three")}
        >
          Three
        </Button>
      </ButtonGroup>
    </div>
  );
};
