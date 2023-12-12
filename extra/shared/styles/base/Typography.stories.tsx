import {
  Code,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@lonlat/shared";

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
              <Code>{`.h${level}`}</Code>
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
      {["2xl", "xl", "lg", "rg", "sm", "xs", "2xs"].map((size) => {
        return (
          <TableRow key={size}>
            <TableCell label="Usage">
              <Code>{`.text-${size}`}</Code>
            </TableCell>
            <TableCell label="Example">
              <span className={`text-${size}`}>Lorem ipsum</span>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export const Content = () => (
  <div>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard <a href="#">dummy text</a> ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make a type specimen book. It has survived.
      Visit the Lonlat website, not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
      of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
      software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <p>
      There is a{" "}
      <a href="#" className="ll-href ghost">
        ghost
      </a>{" "}
      link.
    </p>
  </div>
);
