import { LoaderFunction } from "react-router-dom";
import { fetchAPI } from "~/lib/fetch/fetchAPI";

export const usersLoader: LoaderFunction = async () => {
  return fetchAPI("/admin/users").then(({ json }) => json["hydra:member"]);
};

export const userLoader: LoaderFunction = async ({ params }) => {
  const { userId } = params;
  return fetchAPI(`/admin/users/${userId}`).then(({ json }) => json);
};
