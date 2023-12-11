import { cleanup, fireEvent, render, getByText, screen } from "@testing-library/react";
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

  it("queries", () => {
    const infos = render(
      <form>
        <label htmlFor="name">nom</label>
        <input type="text" id="name" value="Hello world" />

        <label>
          email <input />
        </label>
        <p>Hello world</p>
      </form>,
    );
    const { getByText: localGetByText, container } = infos;
    let elt = localGetByText("nom");
    elt = getByText(container, "nom");
    elt = screen.getByText("nom");
    console.log(elt);
  });
});
