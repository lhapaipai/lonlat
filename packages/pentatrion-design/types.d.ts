import "react";

export type ThemeColor = "primary" | "weak" | "danger" | "warning" | "success" | "info";

export interface Town {
  insee: number;
  code_postal: number;
  latitude: number;
  longitude: number;
  nom_commune: string;
  code_departement: number;
  nom_departement: string;
  code_region: number;
  nom_region: string;
  context: string;
  population: number;
  icon: string;
}

type Merge<T, U> = Omit<T, keyof U> & U;
type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };
export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;

declare global {
  interface GlobalEventHandlersEventMap {
    "maplibre-contextmenu": CustomEvent;
  }
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
