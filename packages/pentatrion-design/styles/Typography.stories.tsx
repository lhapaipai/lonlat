import { Code } from "../components/code/Code";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/table";
import { Content } from "./Content";

export default {
  title: "Styles/Typography",
};

type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Headers = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Usage</TableHeaderCell>
        <TableHeaderCell>Example</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[1, 2, 3, 4, 5, 6].map((level) => {
        const HeaderTag = `h${level}` as HeaderTag;
        return (
          <TableRow key={level}>
            <TableCell label="Usage">
              <Code>{`h${level}`}</Code>
            </TableCell>
            <TableCell label="Example">
              <HeaderTag>Lorem ipsum</HeaderTag>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export const TextSizes = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Usage</TableHeaderCell>
        <TableHeaderCell>Example</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[
        "text-5xl",
        "text-4xl",
        "text-3xl",
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
        "text-sm",
        "text-xs",
      ].map((sizeClass) => {
        return (
          <TableRow key={sizeClass}>
            <TableCell label="Usage">
              <Code>{`.${sizeClass}`}</Code>
            </TableCell>
            <TableCell label="Example">
              <span className={sizeClass}>Lorem ipsum</span>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export const Typography = () => (
  <div>
    <h1>Without TailwindCSS Typography</h1>
    <Content />
    <h1>With TailwinCSS Typography</h1>
    <div className="prose">
      <Content />
    </div>
  </div>
);
