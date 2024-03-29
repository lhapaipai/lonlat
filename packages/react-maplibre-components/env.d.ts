import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;
