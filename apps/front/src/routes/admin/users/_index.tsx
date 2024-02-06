import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@lonlat/shared";
import { Link, useLoaderData } from "react-router-dom";
import { UserPublic } from "~/types/api";

export default function Index() {
  const users = useLoaderData() as UserPublic[];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Firstname</TableHeaderCell>
          <TableHeaderCell>Lastname</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell label="Email">{user.email}</TableCell>
            <TableCell label="Username">{user.username}</TableCell>
            <TableCell label="Firstname">{user.firstname}</TableCell>
            <TableCell label="Lastname">{user.lastname}</TableCell>
            <TableCell label="Actions">
              <Link to={`/admin/users/${user.id}/edit`}>Éditer</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
