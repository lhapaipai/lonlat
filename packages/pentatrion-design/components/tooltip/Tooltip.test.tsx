import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SimpleTooltip } from ".";

afterEach(cleanup);

describe("<Tooltip />", () => {
  it("show the popup", async () => {
    const { getByText, findByText } = render(
      <SimpleTooltip openDelay={1} content="details">
        tooltip
      </SimpleTooltip>,
    );

    fireEvent.mouseEnter(getByText("tooltip"));
    const details = await findByText("details");

    expect(details).toBeInTheDocument();
  });
});
