import {
  Code,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "pentatrion-design";

export default {
  title: "Styles/Themes",
};

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
