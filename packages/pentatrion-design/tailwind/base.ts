import { CSSRuleObject } from "tailwindcss/types/config";

export const base: CSSRuleObject = {
  html: {
    "font-size": "16px",
    "line-height": "24px",
    "color-scheme": "normal",
  },

  body: {
    "--tw-bg-opacity": "1",
    "--tw-text-opacity": "1",
    "font-family": "ui-sans-serif, system-ui, sans-serif",
    "background-color": "rgb(var(--color-gray-0) / var(--tw-bg-opacity))",
    color: "rgb(var(--color-gray-7) / var(--tw-text-opacity))",
  },

  ".light": {
    colorScheme: "light",
  },

  ":root": {
    "--color-white": "255 255 255",
    "--color-black": "0 0 0",

    /* bg outlined color */
    "--color-yellow-1": "255 250 199" /* rgb(255, 250, 199); */,

    /* bg outlined hovered color */
    "--color-yellow-2": "255 245 142" /* rgb(255, 245, 142); */,

    // /* button default bgcolor */
    "--color-yellow-3": "255 232 34" /* rgb(255, 232, 34); */,

    // /* text color, button hover bgcolor */
    "--color-yellow-4": "251 191 36" /* rgb(251, 191, 36); */,

    // /* text hover color, button active bgcolor */
    "--color-yellow-5": "245 158 11" /* rgb(245, 158, 11); */,

    "--color-yellow-text": "var(--color-gray-7)",

    "--color-green-1": "232 245 212" /* rgb(232, 245, 212); */,
    "--color-green-2": "209 235 170" /* rgb(209, 235, 170); */,
    "--color-green-3": "162 215 87" /* rgb(162, 215, 87); */,
    "--color-green-4": "138 200 66" /* rgb(138, 200, 66); */,
    "--color-green-5": "79 158 35" /* rgb(79, 158, 35); */,
    "--color-green-text": "var(--color-gray-7)",

    "--color-blue-1": "237 247 255" /* rgb(237, 247, 255); */,
    "--color-blue-2": "203 232 255" /* rgb(203, 232, 255); */,
    "--color-blue-3": "131 203 255" /* rgb(131, 203, 255);*/,
    "--color-blue-4": "75 167 230" /* rgb(75, 167, 230);*/,
    "--color-blue-5": "37 126 158" /* rgb(37, 126, 158);*/,
    "--color-blue-text": "var(--color-gray-7)",

    "--color-orange-1": "255 244 219" /* rgb(255, 244, 219); */,
    "--color-orange-2": "255 221 179" /* rgb(255, 221, 179); */,
    "--color-orange-3": "255 176 100" /* rgb(255, 176, 100); */,
    "--color-orange-4": "230 140 53" /* rgb(230, 140, 53); */,
    "--color-orange-5": "179 91 38" /* rgb(179, 91, 38); */,
    "--color-orange-text": "var(--color-gray-7)",

    "--color-red-1": "255 219 219" /* rgb(255, 219, 219); */,
    "--color-red-2": "255 183 183" /* rgb(255, 183, 183); */,
    "--color-red-3": "255 111 111" /* rgb(255, 111, 111); */,
    "--color-red-4": "230 62 62" /* rgb(230, 62, 62); */,
    "--color-red-5": "179 38 38" /* rgb(179, 38, 38); */,
    "--color-red-text": "var(--color-gray-7)",

    "--color-gray-0": "255 255 255" /* rgb(255, 255, 255); */,
    "--color-gray-1": "242 242 242" /* rgb(242, 242, 242); */,
    "--color-gray-2": "228 228 228" /* rgb(228, 228, 228); */,
    "--color-gray-3": "204 204 204" /* rgb(204, 204, 204); */,
    "--color-gray-4": "180 180 180" /* rgb(180, 180, 180); */,
    "--color-gray-5": "140 140 140" /* rgb(140, 140, 140); */,
    /* text-hint text-disabled */
    "--color-gray-6": "90 90 90" /* rgb(90, 90, 90); */,
    "--color-gray-7": "50 50 50" /* rgb(50, 50, 50); */,
    "--color-gray-8": "0 0 0" /* rgb(0, 0, 0); */,
    "--color-gray-text": "var(--color-gray-7)",

    "--resize-grip": "10px",
    "--resize-indicator": "2px",

    "--step-circle-radius": "16px",
  },
  ".dark": {
    colorScheme: "dark",
    /* text hover color, button active bgcolor */
    "--color-yellow-5": "255 250 199" /* rgb(255, 250, 199); */,
    /* text color, button hover bgcolor */
    "--color-yellow-4": "255 245 142" /* rgb(255, 245, 142); */,
    /* button default bgcolor */
    "--color-yellow-3": "255 232 34" /* rgb(255, 232, 34); */,
    /* bg outlined hovered color (with generally 50% transparency) */
    "--color-yellow-2": "251 191 36" /* rgb(251, 191, 36); */,
    /* bg outlined color (with generally 50% transparency) */
    "--color-yellow-1": "245 158 11" /* rgb(245, 158, 11); */,

    "--color-yellow-text": "var(--color-gray-0)",

    "--color-green-5": "232 245 212" /* rgb(232, 245, 212); */,
    "--color-green-4": "209 235 170" /* rgb(209, 235, 170); */,
    "--color-green-3": "162 215 87" /* rgb(162, 215, 87); */,
    "--color-green-2": "138 200 66" /* rgb(138, 200, 66); */,
    "--color-green-1": "79 158 35" /* rgb(79, 158, 35); */,
    "--color-green-text": "var(--color-gray-0)",

    "--color-blue-5": "237 247 255" /* rgb(237, 247, 255); */,
    "--color-blue-4": "203 232 255" /* rgb(203, 232, 255); */,
    "--color-blue-3": "131 203 255" /* rgb(131, 203, 255);*/,
    "--color-blue-2": "75 167 230" /* rgb(75, 167, 230);*/,
    "--color-blue-1": "37 126 158" /* rgb(37, 126, 158);*/,
    "--color-blue-text": "var(--color-gray-0)",

    "--color-orange-5": "255 244 219" /* rgb(255, 244, 219); */,
    "--color-orange-4": "255 221 179" /* rgb(255, 221, 179); */,
    "--color-orange-3": "255 176 100" /* rgb(255, 176, 100); */,
    "--color-orange-2": "230 140 53" /* rgb(230, 140, 53); */,
    "--color-orange-1": "179 91 38" /* rgb(179, 91, 38); */,
    "--color-orange-text": "var(--color-gray-0)",

    "--color-red-5": "255 219 219" /* rgb(255, 219, 219); */,
    "--color-red-4": "255 183 183" /* rgb(255, 183, 183); */,
    "--color-red-3": "255 111 111" /* rgb(255, 111, 111); */,
    "--color-red-2": "230 62 62" /* rgb(230, 62, 62); */,
    "--color-red-1": "179 38 38" /* rgb(179, 38, 38); */,
    "--color-red-text": "var(--color-gray-0)",

    "--color-gray-8": "255 255 255" /* rgb(255, 255, 255); */,
    "--color-gray-7": "220 220 220" /* rgb(220, 220, 220); */,
    /* text-hint text-disabled */
    "--color-gray-6": "180 180 180" /* rgb(180, 180, 180); */,
    "--color-gray-5": "140 140 140" /* rgb(140, 140, 140); */,
    "--color-gray-4": "100 100 100" /* rgb(100, 100, 100); */,
    "--color-gray-3": "75 75 75" /* rgb(75, 75, 75); */,
    "--color-gray-2": "50 50 50" /* rgb(50, 50, 50); */,
    "--color-gray-1": "35 35 35" /* rgb(35, 35, 35); */,
    "--color-gray-0": "21 29 29" /* rgb(21, 29, 29); */,
    "--color-gray-text": "var(--color-gray-8)",
  },

  'input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
    {
      display: "none",
    },

  ":focus-visible": {
    "outline-style": "solid",
    "outline-offset": "2px",
    "outline-width": "2px",
    "outline-color": "rgb(var(--color-yellow-5) / 1)",
    "border-radius": "0.25rem",
  },

  "textarea:read-only": {
    "--tw-bg-opacity": "1",
    "background-color": "rgb(var(--color-gray-1) / var(--tw-bg-opacity))",
  },
};
