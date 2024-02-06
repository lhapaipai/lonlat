import { UseFormSetError } from "react-hook-form";
import { fetchAPI } from "~/lib/fetch/fetchAPI";
import { SubmissionError } from "~/lib/fetch/errors";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { apiEntrypoint } from "~/config/constants";
import { User } from "~/types/api";
import UserForm, { Inputs } from "./_partials/UserForm";

export default function AdminUsersEdit() {
  const navigate = useNavigate();
  const user = useLoaderData() as User;

  function handleSubmit(data: Inputs, setError: UseFormSetError<Inputs>) {
    console.log("handleSubmit", data);
    fetchAPI(`${apiEntrypoint}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate("/admin/users");
      })
      .catch((err) => {
        if (err instanceof SubmissionError) {
          for (const [key, message] of Object.entries(err.violations)) {
            setError(key as keyof Inputs, {
              type: "serverError",
              message,
            });
          }
        } else if (err instanceof Error) {
          setError("root.serverError", {
            type: err.name,
            message: err.message,
          });
        }
      });
  }

  return (
    <div>
      <h1>Édition</h1>
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
}
