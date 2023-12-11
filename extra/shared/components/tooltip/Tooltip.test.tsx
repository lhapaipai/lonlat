import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { SimpleTooltip } from ".";

describe("<Tooltip />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("show the popup", async () => {
    const { getByRole, getByText } = render(
      <SimpleTooltip content="details">tooltip</SimpleTooltip>,
    );

    fireEvent.focus(getByRole("button"));
    vi.advanceTimersByTime(500);
    getByText("details");
  });
});
