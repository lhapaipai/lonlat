import { Button, InputField, Select } from "@lonlat/shared";
import { Controller, SubmitHandler, UseFormSetError, useForm } from "react-hook-form";
import { User } from "~/types/api";

export type Inputs = Pick<User, "username" | "email" | "firstname">;

interface Props {
  user?: User;
  onSubmit?: (data: Inputs, setError: UseFormSetError<Inputs>) => void;
}

const firstnameOptions = [
  {
    label: "Hugues",
    value: "hugues",
  },
  {
    label: "Jean-Jacques",
    value: "jean-jacques",
  },
];

export default function UserForm({ user, onSubmit }: Props) {
  const {
    control,
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
          <div className="ll-flash p-2 alert-danger">{errors.root?.serverError.message}</div>
        )}
        <div className="two-cols">
          <InputField
            label="Nom d'utilisateur"
            error={errors.username?.message}
            {...register("username", {
              required: "champ obligatoire",
              minLength: {
                value: 2,
                message: "Minimum 2 caractères",
              },
              maxLength: {
                value: 10,
                message: "Maximum 10 caractères",
              },
            })}
          />

          <InputField
            label="Email"
            error={errors.email?.message}
            {...register("email", { required: "champ obligatoire" })}
          />
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <InputField
                label="firstname"
                as={Select}
                options={firstnameOptions}
                error={errors.firstname?.message}
                {...field}
              />
            )}
          />
        </div>
        <p>
          <Button>Valider</Button>
        </p>
      </form>
    </div>
  );
}
