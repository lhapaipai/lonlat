import { useLoaderUpdatableResource } from "~/hooks";
import { User } from "~/types/User";

export default function AdminUsersShow() {
  const user = useLoaderUpdatableResource<User>();

  return (
    <div>
      <article>
        <h1>{user.username}</h1>
      </article>
    </div>
  );
}
