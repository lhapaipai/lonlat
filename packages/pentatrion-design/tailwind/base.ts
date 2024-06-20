import { CSSRuleObject } from "tailwindcss/types/config";

export const layout: CSSRuleObject = {
  html: {
    "font-size": "16px",
    "line-height": "24px",
    "color-scheme": "normal",
  },

  body: {
    "@apply bg-gray-0 font-sans text-gray-7": {},
  },

  ".light": {
    colorScheme: "light",
  },
};

export const base: CSSRuleObject = {
  ":focus-visible": {
    "@apply rounded outline outline-2 outline-offset-2 outline-yellow-5": {},
  },

  "textarea:read-only": {
    "@apply bg-gray-1": {},
  },

  'input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
    {
      display: "none",
    },

  'input[type="range"]': {
    backgroundColor: "transparent",
  },

  'input[type="range"]::range-thumb': {
    appearance: "none",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
  },

  mark: {
    "@apply bg-yellow-1 text-gray-8": {},
  },

  abbr: {
    "@apply cursor-help underline decoration-dashed": {},
  },
};
