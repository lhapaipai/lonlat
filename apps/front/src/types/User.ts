import { FieldError } from "react-hook-form";
import { ApiResource } from "./jsonld";

export interface UserPublic extends ApiResource {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface User extends UserPublic {
  roles: string[];
}

export const usernameValidation = {
  required: "champ obligatoire",
  minLength: {
    value: 2,
    message: "Minimum 2 caractères",
  },
  maxLength: {
    value: 10,
    message: "Maximum 10 caractères",
  },
};

export const emailValidation = { required: "champ obligatoire" };

export const requiredValidation = { required: "champ obligatoire" };
