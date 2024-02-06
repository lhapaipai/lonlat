import { UseFormSetError } from "react-hook-form";
import { fetchAPI } from "~/lib/fetch/fetchAPI";
import { SubmissionError } from "~/lib/fetch/errors";
import { Link, useNavigate } from "react-router-dom";
import { apiEntrypoint } from "~/config/constants";
import UserForm, { Inputs } from "./_partials/UserForm";

export default function AdminUsersCreate() {
  const navigate = useNavigate();

  function handleSubmit(data: Inputs, setError: UseFormSetError<Inputs>) {
    fetchAPI(`${apiEntrypoint}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log("ok !", json);
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
      <h1>Create</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
