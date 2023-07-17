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
  title: "Base/Typography",
};

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
        const HeaderTag = `h${level}`;
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

export const Text = () => (
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

const TextColorsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Usage</TableHeaderCell>
        <TableHeaderCell>Demonstration</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <Code>.color-default</Code>
          <br />
          <Code>var(--text-default)</Code>
        </TableCell>
        <TableCell>
          <span className="color-default">Lorem ipsum</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Code>.color-weak</Code>
          <br />
          <Code>var(--text-weak)</Code>
        </TableCell>
        <TableCell>
          <span className="color-weak">Lorem ipsum</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Code>.color-hint</Code>
          <br />
          <Code>var(--text-hint)</Code>
        </TableCell>
        <TableCell>
          <span className="color-hint">Lorem ipsum</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Code>.color-disabled</Code>
          <br />
          <Code>var(--text-disabled)</Code>
        </TableCell>
        <TableCell>
          <span className="color-disabled">Lorem ipsum</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const TextColors = () => (
  <>
    <h4>On ui-light background</h4>
    <TextColorsTable />

    <h4>On ui-dark background</h4>
    <div className="ui-dark rounded-xl p-4">
      <TextColorsTable />
    </div>
  </>
);
