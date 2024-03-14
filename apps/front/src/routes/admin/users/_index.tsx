import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "pentatrion-design";
import { Link } from "react-router-dom";
import { useLoaderUpdatableCollection } from "~/hooks";
import { UserPublic } from "~/types/User";

export default function Index() {
  const users = useLoaderUpdatableCollection<UserPublic>();

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
        {users["hydra:member"].map((user) => (
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
