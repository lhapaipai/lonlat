import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useEventListener } from "..";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useEventListener()", () => {
  test("should bind the event listener to window when element is not provided", () => {
    const handler = vi.fn();
    const eventName = "test-event";

    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    // @ts-ignore
    const { unmount } = renderHook(() => useEventListener(eventName, handler));

    expect(addEventListenerSpy).toHaveBeenCalledOnce();
    expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, expect.any(Function), undefined);

    window.dispatchEvent(new Event(eventName));

    expect(handler).toHaveBeenCalledOnce();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledOnce();
  });

  test("should call the listener when event is dispatched", async () => {
    const user = userEvent.setup();

    const elt = {
      current: document.createElement("div"),
    };
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEventListener("click", handler, elt));

    await user.click(elt.current);

    expect(handler).toHaveBeenCalledOnce();

    unmount();

    await user.click(elt.current);

    expect(handler).toHaveBeenCalledOnce();
  });
});
