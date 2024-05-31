import { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...rest }) => {
      if (!href) {
        return <a {...rest} />;
      }
      return <Link href={href} {...rest} />;
    },
    ...components,
  };
}
