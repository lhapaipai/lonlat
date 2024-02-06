import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@lonlat/shared";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { fetchAPI } from "~/lib/fetch/fetchAPI";
import { UserPublic } from "~/types/api";

export const usersLoader: LoaderFunction = async () => {
  return fetchAPI("/admin/users").then(({ json }) => json["hydra:member"]);
};

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell label="Email">{user.email}</TableCell>
            <TableCell label="Username">{user.username}</TableCell>
            <TableCell label="Firstname">{user.firstname}</TableCell>
            <TableCell label="Lastname">{user.lastname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
