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
