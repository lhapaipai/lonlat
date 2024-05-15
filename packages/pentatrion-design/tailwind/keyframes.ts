import { ThemeConfig } from "tailwindcss/types/config";

export const keyframes: ThemeConfig["keyframes"] = {
  ripple: {
    to: {
      transform: "scale(4)",
      opacity: "0",
    },
  },
  "fade-in": {
    from: {
      transform: "scale(.8)",
      opacity: "0",
    },
    to: {
      transform: "scale(1)",
      opacity: "1",
    },
  },
  "fade-in-list": {
    from: {
      transform: "scaleY(.8)",
      opacity: "0",
    },
    to: {
      transform: "scaleY(1)",
      opacity: "1",
    },
  },
  "fade-out": {
    from: {
      transform: "scale(1)",
      opacity: "1",
    },
    to: {
      transform: "scale(.8)",
      opacity: "0",
    },
  },
  "fade-in-opacity": {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  flash: {
    "0%": {
      opacity: "0",
    },
    "50%": {
      opacity: "1",
    },
    "100%": {
      opacity: "0",
    },
  },
  "loader-stroke": {
    from: {
      // check : packages/pentatrion-design/components/loader/Loader.tsx
      // for dashoffset value
      "stroke-dashoffset": "43.699",
    },
    to: {
      "stroke-dashoffset": "0",
    },
  },
};
