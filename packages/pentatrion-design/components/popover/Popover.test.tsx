import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from ".";

afterEach(cleanup);

describe("<Popover />", () => {
  it("open popup on click", async () => {
    const { getByText, getByRole } = render(
      <Popover color="yellow">
        <PopoverTrigger>My trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverDescription>Content</PopoverDescription>
        </PopoverContent>
      </Popover>,
    );

    fireEvent.click(getByRole("button"));
    getByText("Content");
  });
});
