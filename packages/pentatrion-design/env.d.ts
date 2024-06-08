import "react";

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
    "contextmenu-custom": CustomEvent;
  }
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
