import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { SimpleTooltip } from ".";

afterEach(cleanup);

describe("<Tooltip />", () => {
  it("show the popup", async () => {
    const { getByRole, findByText } = render(
      <SimpleTooltip openDelay={1} content="details">
        tooltip
      </SimpleTooltip>,
    );

    fireEvent.mouseEnter(getByRole("button"));
    findByText("details");
  });
});
