import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Button } from ".";

afterEach(cleanup);

describe("<Button />", () => {
  it("forwards className", () => {
    const { getByRole } = render(<Button className="custom" />);
    expect(getByRole("button")).toHaveClass("custom");
  });

  it("handle click", () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Button onClick={mockOnClick}>Click Me</Button>);

    fireEvent.click(getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
