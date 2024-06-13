# Maplibre GL CSS Themes

## Theme `optimized`

this theme is like the current theme with some improvements.

- light : actually 23ko minified (the current theme from `maplibre-gl/dist/maplibre-gl.css` is 65ko minified).
- support dark mode
- support CSS variables for easy optimisation.

## Installation

```bash
npm i maplibre-theme
```

in your js file

```diff
- import "maplibre-gl/dist/maplibre-gl.css";
+ import "maplibre-theme/dist/optimized.css";
```

advanced configuration with CSS vars.

```css
.maplibregl-map {
  --ml-ctrl-border-radius: 4px;
  --ml-font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  --ml-font-attribution: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;

  --blue: 29 161 242;
  --ml-c-neutral: 0 0 0;

  --ml-c-active: var(--blue);
  --ml-c-error: 229 78 51;

  --ml-c-bg: 255 255 255;

  --ml-c-gray-1: 255 255 255;
  --ml-c-gray-2: 240 240 240;
  --ml-c-gray-3: 215 215 215;

  --ml-c-text: 51 51 51;
  --ml-c-icon: 51 51 51;

  --ml-c-disabled: 170 170 170;

  --ml-shadow-ctrl: 0 0 0 2px rgb(0 0 0 / 10%);
  --ml-shadow-popup: 0 1px 2px rgb(0 0 0 / 10%);

  --ml-c-geoloc: var(--blue);
  --ml-outline: 0 0 2px 2px rgb(var(--blue));
}
```

note: define your colors as just the color channel so we can work with the opacity modifier syntax [TailwindCSS explanation](https://tailwindcss.com/docs/customizing-colors#using-css-variables).

## Screenshot


<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/packages/maplibre-theme/screenshot.png" alt="MapLibre light theme" />

@media (-ms-high-contrast: active) {} 	@media (forced-colors: active) {}

@media (-ms-high-contrast: black-on-white) {} 	@media (forced-colors: active) and (prefers-color-scheme: light) {}


## Create your own Theme

To facilitate the creation of themes for MapLibre, the main style sheet has been split into several files. vital css rules vs default style related rules.

```css
@import "maplibre-theme/dist/core.css";
```
