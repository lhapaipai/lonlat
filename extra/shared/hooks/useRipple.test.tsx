import { useRef } from "react";
import { afterEach, describe, it, vi } from "vitest";
import { useRipple } from ".";
import { cleanup, fireEvent, render } from "@testing-library/react";

const TestEltWithRipple = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const ripples = useRipple(ref);
  return (
    <button role="button" ref={ref}>
      {ripples}
    </button>
  );
};

afterEach(cleanup);

describe("useRipple", () => {
  it("add as many ripples as mouse clicks", async ({ expect }) => {
    const { getByRole, getAllByTestId } = render(<TestEltWithRipple />);
    const button = getByRole("button");

    fireEvent.pointerDown(button);
    fireEvent.pointerDown(button);

    expect(getAllByTestId("ripple")).toHaveLength(2);
  });

  it("cleanup after 1 second", ({ expect }) => {
    vi.useFakeTimers();

    const { getByRole, queryAllByTestId, rerender } = render(<TestEltWithRipple />);
    const button = getByRole("button");

    fireEvent.pointerDown(button);

    vi.advanceTimersByTime(999);

    rerender(<TestEltWithRipple />);
    expect(queryAllByTestId("ripple")).toHaveLength(1);

    vi.advanceTimersByTime(999);

    rerender(<TestEltWithRipple />);

    vi.advanceTimersByTime(2);

    expect(queryAllByTestId("ripple")).toHaveLength(0);

    vi.restoreAllMocks();
  });
});
