# [Pentatrion Design System](https://storybook.lonlat.pentatrion.com)

<a href="https://storybook.lonlat.pentatrion.com">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/storybook.jpg" alt="Pentatrion design system" />
</a>

## Prérequis

Créez un nouveau projet Vite + React + TailwindCSS. [Official doc](https://tailwindcss.com/docs/guides/vite)

```bash
pnpm create vite my-app

# 1. React
# 2. TypeScript + SWC

cd my-app

pnpm add -D tailwindcss postcss autoprefixer postcss-load-config prettier-plugin-tailwindcss

# si vous utilisez le composant <input type="range" />
pnpm add -D postcss-input-range
```

Supprimer les fichiers inutiles

```
.
├── src
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
└── postcss.config.js
```

Créer un fichier `tailwind.config.js` et `postcss.config.js`.

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
};


// postcss.config.js
/** @type {import("postcss-load-config").Config} */
export default {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},

    // si vous utilisez le composant <input type="range" />
    // bien le mettre en dernier car tailwind génère du contenu à transformer
    "postcss-input-range": {}
  },
};
```

Mettre à jour le fichier `src/index.css`
```css
/* on utilisera des imports pour faciliter l'intégration du design système */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## Installation


```bash
pnpm add pentatrion-design
```

Mettre à jour la configuration de tailwind.

```diff
// tailwind.config.js
+ import { pentatrionTw } from "pentatrion-design/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
+   "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
+   "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
+   "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
+  plugins: [pentatrionTw],
};
```

La dépendance `pentatrion-fonts` est optionnelle.

Mettre à jour `src/App.tsx`
```tsx
// import global
import { Button } from "pentatrion-design";

// import minimal
import { Button } from "pentatrion-design/components/button";

import { useState } from "react"

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-gray-6">Vite + React</h1>
      <Button onClick={() => setCounter(c => c + 1)}>Click me !</Button>
      <p>{counter}</p>
    </div>
  )
}

export default App
```

L'import minimal `import { Button } from "pentatrion-design/components/button";` est plus contraignant et n'est pas nécessaire si votre projet utilise toutes les dépendances de `pentatrion-design`. si par contre votre projet n'utilise que certains composants et n'utilise pas certains dépendances comme `react-sortablejs` il vaut mieux utiliser l'import `pentatrion-design/components/button`. Cela allégera le build (que notre compilateur fasse du tree shaking ou non).

Mettre à jour `src/index.css`
```diff
/* index.css */
@import "tailwindcss/base";
+ @import "pentatrion-design/tailwind/base.css" layer(base);

@import "tailwindcss/components";
+ @import "pentatrion-design/tailwind/components.css" layer(components);
+ @import "pentatrion-design/tailwind/components-input-outline.css" layer(components);
+ @import "pentatrion-design/tailwind/components-resize-area.css" layer(components);
+ @import "pentatrion-design/tailwind/components-step.css" layer(components);

@import "tailwindcss/utilities";
+ @import "pentatrion-design/tailwind/utilities.css" layer(utilities);
+ @import "pentatrion-design/tailwind/utilities-dialog.css" layer(utilities);

/* Optionel */
+ @import "pentatrion-fonts/fontello-lonlat";
```


## projet sans TypeScript

pour faciliter l'expérience de développement, `pentatrion-design` fait référence par défaut aux fichiers TypeScript non compilés. Si votre projet n'utilise pas TypeScript il faudra faire référence au dossier `dist`

```js
import { Button } from "pentatrion-design/dist";
```

## VsCode


Create a `.vscode/settings.json` file

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```
