import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

type DarkModeReturn = {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
  setDarkMode: (value: boolean) => void;
};

export function useDarkMode(): DarkModeReturn {
  // dark by default because I prefer the dark theme for this doc...
  const [isDarkMode, setDarkMode] = useState(() =>
    typeof window === "undefined"
      ? true
      : document.body.classList.contains("dark"),
  );

  useIsomorphicLayoutEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode((prev) => !prev);
    },
    enable: () => {
      setDarkMode(true);
    },
    disable: () => {
      setDarkMode(false);
    },
    setDarkMode,
  };
}
