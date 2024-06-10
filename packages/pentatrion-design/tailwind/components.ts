import { CSSRuleObject } from "tailwindcss/types/config";

export const componentsStep: CSSRuleObject = {
  ".ll-steps-extra": {
    "@apply flex justify-between": {},
    "& button:first-child": {
      padding:
        "calc(var(--step-circle-radius) / 2) calc(var(--step-circle-radius) / 2)\n      calc(var(--step-circle-radius) / 2) calc(var(--step-circle-radius) * 1.5 + 1rem)",
    },
    "& .ll-marker": {
      transform: "translate(calc(var(--step-circle-radius) / 3))",
    },
  },
  ".ll-steps": {
    "@apply relative": {},
    '&[data-marker="circle"]': {
      ".marker": {
        "@apply shadow bg-gray-1": {},
        width: "calc(var(--step-circle-radius) * 2)",
        height: "calc(var(--step-circle-radius) * 2)",
        "&.active": { "@apply bg-gray-2": {} },
      },
    },
    '&[data-marker="bullet"]': {
      ".marker": {
        "@apply text-2xs bg-gray-0 outline outline-2 outline-gray-2": {},
        margin: "calc(var(--step-circle-radius) / 2)",
        width: "calc(var(--step-circle-radius))",
        height: "calc(var(--step-circle-radius))",
        "&.active": { "@apply outline-gray-4": {} },
      },
    },
    '&[data-direction="horizontal"]': {
      "@apply flex flex-wrap": {},
      '&[data-marker="circle"]': {
        "--line-width":
          "calc(100% - var(--step-circle-radius) * 2 - var(--line-space) * 2)",
        "--line-left":
          "calc(50% + var(--step-circle-radius) + var(--line-space))",
      },
      '&[data-marker="bullet"]': {
        "--line-width":
          "calc(100% - var(--step-circle-radius) - var(--line-space) * 2)",
        "--line-left":
          "calc(50% + var(--step-circle-radius) / 2 + var(--line-space))",
      },
      "& .ll-step": {
        "@apply flex flex-col flex-1 text-center": {},
        ".content": { "@apply mt-2": {} },
      },
      '&[data-global-line="false"] .ll-step:not(:last-child)::after': {
        content: '""',
        borderStyle: "none none var(--line-style) none",
        width: "var(--line-width)",
        marginTop: "-2px",
        order: "-1",
        position: "relative",
        top: "calc(var(--step-circle-radius) + 1px)",
        left: "var(--line-left)",
      },
      ".marker-container": { "@apply flex items-center justify-center": {} },
    },
    '&[data-direction="vertical"]': {
      '&[data-marker="circle"]': {
        "--line-top": "calc(var(--step-circle-radius) * 2 + var(--line-space))",
        "--line-bottom": "var(--line-space)",
      },
      '&[data-marker="bullet"]': {
        "--line-top":
          "calc(var(--step-circle-radius) * 1.5 + var(--line-space))",
        "--line-bottom":
          "calc(-0.5 * var(--step-circle-radius) + var(--line-space))",
      },
      ".ll-step": {
        "@apply relative gap-1 items-start flex": {},
        "&:not(:last-child)": { paddingBottom: "0.5rem" },
      },
      '&[data-global-line="false"] .ll-step:not(:last-child)::after': {
        "@apply absolute left-0 w-0": {},
        content: '""',
        top: "var(--line-top)",
        bottom: "var(--line-bottom)",
        transform: "translateX(calc(var(--step-circle-radius) - 1px))",
        borderStyle: "none none none var(--line-style)",
      },
      '&[data-global-line="{}"]::after': {
        "@apply absolute left-0 w-0 z-0": {},
        content: '""',
        top: "var(--line-top)",
        bottom: "var(--line-top)",
        transform: "translateX(calc(var(--step-circle-radius) - 1px))",
        borderStyle: "none none none var(--line-style)",
      },
      ".content": { "@apply flex-1": {} },
      ".title": { lineHeight: "1rem" },
    },
    '&[data-global-line="{}"]': {
      "&::after": { "@apply border-gray-2 border-2": {} },
      "&.status-done::after": { "@apply border-gray-3": {} },
    },
  },
  ".ll-step": {
    '[data-global-line="false"] &:not(:last-child)': {
      "&::after": { "@apply border-gray-2 border-2": {} },
      "&.status-done::after": { "@apply border-gray-3": {} },
    },
    ".handle": {
      "@apply cursor-row-resize text-gray-6 motion-safe:transition-all": {},
      "&.active": { "&:hover": { "@apply bg-gray-2 text-transparent": {} } },
    },
    ".ll-autocomplete": { "@apply flex-1": {} },
    ".ll-button": { "@apply my-[2px] ml-2": {} },
  },
};

export const componentsResizeArea: CSSRuleObject = {
  ".p8n-resize-area": {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    zIndex: "10",
    overflow: "visible",
    ".area-button": {
      position: "absolute",
      "&::before": {
        content: '""',
        position: "absolute",
        transitionDelay: "0.25s",
        transition: "background-color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      "&:hover::before": { backgroundColor: "rgb(var(--color-gray-5))" },
    },
    "&:where(.top, .bottom)": {
      height: "0",
      width: "100%",
      ".area-button": {
        left: "0",
        right: "0",
        width: "100%",
        height: "var(--resize-grip)",
        cursor: "row-resize",
        "&::before": {
          left: "0",
          right: "0",
          height: "var(--resize-indicator)",
        },
      },
    },
    "&:where(.left, .right)": {
      width: "0",
      height: "100%",
      ".area-button": {
        top: "0",
        bottom: "0",
        height: "100%",
        width: "var(--resize-grip)",
        cursor: "col-resize",
        "&::before": {
          top: "0",
          bottom: "0",
          width: "var(--resize-indicator)",
        },
      },
    },
    "&.top": {
      bottom: "auto",
      ".area-button": {
        top: "calc(-1 * var(--resize-grip) / 2)",
        "&::before": { top: "calc(50% - var(--resize-indicator) / 2)" },
      },
    },
    "&.bottom": {
      top: "auto",
      ".area-button": {
        bottom: "calc(-1 * var(--resize-grip) / 2)",
        "&::before": { bottom: "calc(50% - var(--resize-indicator) / 2)" },
      },
    },
    "&.right": {
      left: "auto",
      ".area-button": {
        right: "calc(-1 * var(--resize-grip) / 2)",
        "&::before": { right: "calc(50% - var(--resize-indicator) / 2)" },
      },
    },
    "&.left": {
      right: "auto",
      ".area-button": {
        left: "calc(-1 * var(--resize-grip) / 2)",
        "&::before": { left: "calc(50% - var(--resize-indicator) / 2)" },
      },
    },
  },
};

export const componentsInputOutline: CSSRuleObject = {
  ":is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text)": {
    "@apply outline outline-1 focus-full:outline-2": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="yellow"])':
    {
      "@apply outline-gray-2 hover:outline-gray-3 focus-full:outline-yellow-4":
        {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="gray"])':
    {
      "@apply outline-gray-2 hover:outline-gray-3 focus-full:outline-gray-4":
        {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="red"])':
    {
      "@apply outline-red-2 hover:outline-red-3 focus-full:outline-red-4": {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="orange"])':
    {
      "@apply outline-orange-2 hover:outline-orange-3 focus-full:outline-orange-4":
        {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="blue"])':
    {
      "@apply outline-blue-2 hover:outline-blue-3 focus-full:outline-blue-4":
        {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-color="green"])':
    {
      "@apply outline-green-2 hover:outline-green-3 focus-full:outline-green-4":
        {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio, .p8n-input-text):where([data-variant="ghost"])':
    {
      "@apply outline-transparent": {},
    },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="yellow"])': {
    "@apply text-yellow-3": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="gray"])': {
    "@apply text-gray-3": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="red"])': {
    "@apply text-red-3": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="orange"])': {
    "@apply text-orange-3": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="blue"])': {
    "@apply text-blue-3": {},
  },
  ':is(.p8n-input-checkbox, .p8n-input-radio):where([data-color="green"])': {
    "@apply text-green-3": {},
  },
  ":is(.p8n-input-checkbox, .p8n-input-radio):is(:checked, .checked, .indeterminate)":
    {
      "@apply bg-full bg-center bg-no-repeat outline-gray-1 bg-current": {},
    },
  ".p8n-input-checkbox:not(.p8n-input-toggle):where(:checked, .checked)": {
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")",
  },
  ".p8n-input-radio:where(:checked, .checked)": {
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\")",
  },
  ":is(.p8n-input-checkbox, .p8n-input-radio):is(.indeterminate, :checked.indeterminate)":
    {
      backgroundImage:
        "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.5 7.5a1 1 0 0 0-1 1 1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1 1 1 0 0 0-1-1Z' /%3e%3c/svg%3e\")",
    },
};

export const components: CSSRuleObject = {
  ".can-copy": {
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    textDecorationColor: "rgb(var(--color-gray-3) / 1)",
    cursor: "copy",
    "&:hover": {
      textDecorationColor: "rgb(var(--color-gray-7) / 1)",
    },
  },
  ".disabled": {
    pointerEvents: "none",
    color: "rgb(var(--color-gray-6) / 1)",
    "&[disabled]": {
      opacity: "0.5",
    },
  },
  ".option": {
    "@apply flex w-full px-2 h-8 items-center text-left relative cursor-pointer first:rounded-t-2xl last:rounded-b-2xl hover:bg-gray-1 focus-full:text-gray-8 outline-none":
      {},
    "&[disabled]": { color: "rgb(var(--color-gray-6))", pointerEvents: "none" },
    ".bullet": {
      width: "1rem",
      height: "1rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "2px solid rgb(var(--color-gray-2))",
      fontSize: "var(--font-size-xs)",
      borderRadius: "50%",
      margin: "0 0.75rem 0 3px",
    },
  },
  ".p8n-separator": {
    "@apply bg-gray-1 w-1/2 h-1 rounded-sm mx-auto relative": {},
  },
  ".p8n-setting": {
    "@apply flex items-center justify-between": {},
    "& > :first-child": { "@apply text-gray-6 text-sm": {} },
    "& > :nth-child(2)": { textAlign: "right" },
    "& > :nth-child(2) input": { textAlign: "right" },
    "&.multiple": { alignItems: "flex-start" },
  },
};
