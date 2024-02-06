import { useLoaderData } from "react-router-dom";
import { User } from "~/types/api";

export default function AdminUsersShow() {
  const user = useLoaderData() as User;

  return (
    <div>
      <article>
        <h1>{user.username}</h1>
      </article>
    </div>
  );
}
