# Pentatrion Design System

## Installation

La dépendance `pentatrion-fonts` est optionnelle.

```bash
pnpm add pentatrion-design pentatrion-fonts
```

```js
// tailwind.config.js
import pentatrionTw from "pentatrion-design";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/pentatrion-design/dist/*.js",
  ],
  darkMode: ["class"],
  plugins: [pentatrionTw],
};
```
```css
/* index.css */
@import "tailwindcss/base";
@import "pentatrion-design/tailwind/base.css" layer(base);

@import "tailwindcss/components";
@import "pentatrion-design/tailwind/components.css" layer(components);
@import "pentatrion-design/tailwind/components-input-outline.css" layer(components);
@import "pentatrion-design/tailwind/components-resize-area.css" layer(components);
@import "pentatrion-design/tailwind/components-step.css" layer(components);

@import "tailwindcss/utilities";
@import "pentatrion-design/tailwind/utilities.css" layer(utilities);
@import "pentatrion-design/tailwind/utilities-dialog.css" layer(utilities);

@import "pentatrion-fonts/fontello-lonlat";
```
