import plugin from "tailwindcss/plugin";
import { keyframes } from "./keyframes";

import defaultTheme from "tailwindcss/defaultTheme";
import { vars } from "./vars";
import { base } from "./base";
import {
  components,
  componentsInputOutline,
  componentsResizeArea,
  componentsStep,
} from "./components";
import { utilities, utilitiesDialog } from "./utilities";

export const pentatrionTypographyExtend = {
  DEFAULT: {
    css: {
      maxWidth: "none",
      a: {
        color: "rgb(var(--color-gray-8))",
        textDecoration: "underline",
        textDecorationColor: "rgb(var(--color-gray-8))",
      },
      "a:visited": {
        color: "rgb(var(--color-gray-8))",
      },
      "a:hover": {
        color: "rgb(var(--color-gray-8))",
        textDecorationColor: "rgb(var(--color-yellow-5))",
        textDecorationThickness: 2,
      },
      "a:active": {
        color: "rgb(var(--color-yellow-5))",
      },
      mark: {
        color: "rgb(var(--color-gray-8))",
        backgroundColor: "rgb(var(--color-yellow-1))",
      },
      abbr: {
        textDecoration: "underline",
        textDecorationStyle: "dashed",
        cursor: "help",
      },
    },
  },
};

interface PentatrionTwOptions {
  vars?: boolean;
  base?: boolean;
  components?: boolean;
  componentsInputOutline?: boolean;
  componentsResizeArea?: boolean;
  componentsStep?: boolean;
  utilities?: boolean;
  utilitiesDialog?: boolean;
}

export const pentatrionTw = plugin.withOptions(
  function (options: PentatrionTwOptions = {}) {
    return ({ addBase, addUtilities, addComponents, addVariant }) => {
      options.vars !== false && addBase(vars);
      options.base !== false && addBase(base);
      options.components !== false && addComponents(components);
      options.componentsInputOutline !== false &&
        addComponents(componentsInputOutline);
      options.componentsResizeArea !== false &&
        addComponents(componentsResizeArea);
      options.componentsStep !== false && addComponents(componentsStep);
      options.utilities !== false && addUtilities(utilities);
      options.utilitiesDialog !== false && addUtilities(utilitiesDialog);

      addVariant("active-full", ["&:active", "&.active"]);
      // addVariant("focus-full", ["&:focus-within", "&.focus", "&:focus"]);
      addVariant("focus-full", ["&:has(input:focus)", "&.focus", "&:focus"]);
    };
  },
  function () {
    return {
      theme: {
        zIndex: {
          auto: "auto",
          0: "0",
          10: "10",
          20: "20",
          30: "30",
          40: "40",
          50: "50",
          dialog: "100",
          overlay: "100",
          tooltip: "100",
          "context-menu": "90",
          notification: "80",
        },
        transitionDuration: {
          ...defaultTheme.transitionDuration,
          DEFAULT: "300ms",
        },
        colors: {
          transparent: "transparent",
          current: "currentColor",
          black: "rgb(var(--color-black) / <alpha-value>)",
          white: "rgb(var(--color-white) / <alpha-value>)",

          yellow: {
            1: "rgb(var(--color-yellow-1) / <alpha-value>)",
            2: "rgb(var(--color-yellow-2) / <alpha-value>)",
            3: "rgb(var(--color-yellow-3) / <alpha-value>)",
            4: "rgb(var(--color-yellow-4) / <alpha-value>)",
            5: "rgb(var(--color-yellow-5) / <alpha-value>)",
            // color of the text when bg is yellow 3
            text: "rgb(var(--color-yellow-text) / <alpha-value>)",
          },
          green: {
            1: "rgb(var(--color-green-1) / <alpha-value>)",
            2: "rgb(var(--color-green-2) / <alpha-value>)",
            3: "rgb(var(--color-green-3) / <alpha-value>)",
            4: "rgb(var(--color-green-4) / <alpha-value>)",
            5: "rgb(var(--color-green-5) / <alpha-value>)",
            // color of the text when bg is green
            text: "rgb(var(--color-green-text) / <alpha-value>)",
          },
          blue: {
            1: "rgb(var(--color-blue-1) / <alpha-value>)",
            2: "rgb(var(--color-blue-2) / <alpha-value>)",
            3: "rgb(var(--color-blue-3) / <alpha-value>)",
            4: "rgb(var(--color-blue-4) / <alpha-value>)",
            5: "rgb(var(--color-blue-5) / <alpha-value>)",
            // color of the text when bg is blue
            text: "rgb(var(--color-blue-text) / <alpha-value>)",
          },
          orange: {
            1: "rgb(var(--color-orange-1) / <alpha-value>)",
            2: "rgb(var(--color-orange-2) / <alpha-value>)",
            3: "rgb(var(--color-orange-3) / <alpha-value>)",
            4: "rgb(var(--color-orange-4) / <alpha-value>)",
            5: "rgb(var(--color-orange-5) / <alpha-value>)",
            // color of the text when bg is orange
            text: "rgb(var(--color-orange-text) / <alpha-value>)",
          },
          red: {
            1: "rgb(var(--color-red-1) / <alpha-value>)",
            2: "rgb(var(--color-red-2) / <alpha-value>)",
            3: "rgb(var(--color-red-3) / <alpha-value>)",
            4: "rgb(var(--color-red-4) / <alpha-value>)",
            5: "rgb(var(--color-red-5) / <alpha-value>)",
            // color of the text when bg is red
            text: "rgb(var(--color-red-text) / <alpha-value>)",
          },
          gray: {
            0: "rgb(var(--color-gray-0) / <alpha-value>)",
            1: "rgb(var(--color-gray-1) / <alpha-value>)",
            2: "rgb(var(--color-gray-2) / <alpha-value>)",
            3: "rgb(var(--color-gray-3) / <alpha-value>)",
            4: "rgb(var(--color-gray-4) / <alpha-value>)",
            5: "rgb(var(--color-gray-5) / <alpha-value>)",
            6: "rgb(var(--color-gray-6) / <alpha-value>)",
            7: "rgb(var(--color-gray-7) / <alpha-value>)",
            8: "rgb(var(--color-gray-8) / <alpha-value>)",
            // color of the text when bg is gray
            text: "rgb(var(--color-gray-text) / <alpha-value>)",
          },
        },
        boxShadow: {
          sm: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
          DEFAULT:
            "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)",
          md: "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)",
          lg: "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -2px rgb(0 0 0 / 0.15)",
          xl: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
          "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.35)",
          inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.1)",
          dark: "0 0 0 1px rgb(var(--color-gray-2))",
          none: "none",
        },
        fontFamily: {
          sans: ["ui-sans-serif", "system-ui", "sans-serif"],
          fontello: ["fontello"],
          serif: defaultTheme.fontFamily.serif,
          mono: defaultTheme.fontFamily.mono,
        },

        extend: {
          // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
          backgroundSize: {
            full: "100%",
          },
          dropShadow: {
            arrow: "0 1px 3px rgb(var(--color-gray-3))",
          },
          transitionProperty: {
            "color-shadow":
              "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
          },
          gridTemplateColumns: {
            "repeat-fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
            "repeat-fill-160": "repeat(auto-fill, minmax(160px, 1fr))",
          },
          animation: {
            ripple: "ripple .9s linear",
            "fade-in": "fade-in 250ms ease both",
            "fade-in-list": "fade-in-list 150ms ease both",
            "fade-out": "fade-out 250ms ease both",
            "fade-in-opacity": "fade-in-opacity 250ms ease both",
            flash: "flash 1000ms ease both infinite",
            "loader-stroke": "loader-stroke 1s linear infinite",
          },
          fontSize: {
            "2xs": ["0.688rem", { lineHeight: "1rem" }],
          },
          keyframes,
        },
      },
    };
  },
);
