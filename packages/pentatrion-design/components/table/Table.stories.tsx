import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from ".";

export default {
  title: "Components/Tables",
};

export const Basic = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Loremium</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell label="ID">Lorem ipsum</TableCell>
          <TableCell label="Name">Lorem ipsum</TableCell>
          <TableCell label="Description">Loremium</TableCell>
        </TableRow>
        <TableRow>
          <TableCell label="ID">Lorem ipsum</TableCell>
          <TableCell label="Name">Lorem ipsum</TableCell>
          <TableCell label="Description">Loremium</TableCell>
        </TableRow>
        <TableRow>
          <TableCell label="ID">Lorem ipsum</TableCell>
          <TableCell label="Name">Lorem ipsum</TableCell>
          <TableCell label="Description">Loremium</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
