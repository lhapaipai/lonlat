import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Input } from ".";
describe("Input component", () => {
  it("forward className to <input> element", () => {
    const { container } = render(<Input className="custom"></Input>);
    const rootElement = container.firstChild;
    expect(rootElement).toHaveClass("custom");
  });
});
