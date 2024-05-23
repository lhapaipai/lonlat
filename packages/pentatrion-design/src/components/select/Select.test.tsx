import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it } from "vitest";
import Select from "./Select";
import { Option } from "./interface";

describe("<Select />", () => {
  it("should open on click", async () => {
    const options: Option[] = [{ label: "foo", value: "foo" }];
    const user = userEvent.setup();
    render(<Select options={options} onChange={() => {}} />);

    await user.click(screen.getByRole("button"));
    const list = await screen.findByTestId("select-list");

    expect(list).toBeInTheDocument();
  });
});
