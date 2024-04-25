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
    <div className="storybook-gap">
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
          <Button color="info" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button color="info" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button color="info" selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button variant="outline" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button variant="outline" selected={val === "three"} onClick={() => setVal("three")}>
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            variant="outline"
            color="weak"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="outline"
            color="weak"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="outline"
            color="weak"
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
            color="danger"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="ghost"
            color="danger"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="ghost"
            color="danger"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-column gap-4" style={{ maxWidth: "400px" }}>
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
            variant="outline"
            color="weak"
            selected={val === "one"}
            onClick={() => setVal("one")}
          >
            One
          </Button>
          <Button
            variant="outline"
            color="weak"
            selected={val === "two"}
            onClick={() => setVal("two")}
          >
            Two
          </Button>
          <Button
            variant="outline"
            color="weak"
            selected={val === "three"}
            onClick={() => setVal("three")}
          >
            Three
          </Button>
        </ButtonGroup>

        <ButtonGroup direction="vertical">
          <Button variant="ghost" color="weak" selected={val === "one"} onClick={() => setVal("one")}>
            One
          </Button>
          <Button variant="ghost" color="weak" selected={val === "two"} onClick={() => setVal("two")}>
            Two
          </Button>
          <Button
            variant="ghost"
            color="weak"
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
