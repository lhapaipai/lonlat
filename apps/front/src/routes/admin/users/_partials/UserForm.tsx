import { Button, InputField } from "pentatrion-design";
import { SubmitHandler, UseFormSetError, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, emailValidation, requiredValidation, usernameValidation } from "~/types/User";

export type Inputs = Pick<User, "username" | "email" | "firstname" | "lastname">;

interface Props {
  user?: User;
  onSubmit?: (data: Inputs, setError: UseFormSetError<Inputs>) => void;
}

export default function UserForm({ user, onSubmit }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: user,
  });

  const onValid: SubmitHandler<Inputs> = (data) => {
    if (onSubmit) {
      onSubmit(data, setError);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} className="blocks-container">
        {errors.root?.serverError && (
          <div className="ll-flash p-2 alert--danger">{errors.root?.serverError.message}</div>
        )}
        <div className="two-cols">
          <InputField
            label="Nom d'utilisateur"
            error={errors.username?.message}
            {...register("username", usernameValidation)}
          />

          <InputField
            label="Email"
            error={errors.email?.message}
            {...register("email", emailValidation)}
          />
        </div>
        <div className="two-cols">
          <InputField
            label="Nom de famille"
            error={errors.lastname?.message}
            {...register("lastname", requiredValidation)}
          />

          <InputField
            label="Prénom"
            error={errors.firstname?.message}
            {...register("firstname", requiredValidation)}
          />
        </div>
        <p>
          <Button
            type="weak"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Revenir
          </Button>
          <Button>Valider</Button>
        </p>
      </form>
    </div>
  );
}
