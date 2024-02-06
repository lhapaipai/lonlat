import { RouteObject } from "react-router-dom";
import Base from "~/routes/_base";
import AdminBase from "~/routes/admin/_base";

import Index from "~/routes/_index";
import AdminUsersList from "~/routes/admin/users/_index";
import AdminIndex from "~/routes/admin/_index";
import AdminUsersShow from "~/routes/admin/users/show";
import { userLoader, usersLoader } from "~/routes/admin/users/_loaders";
import AdminUsersCreate from "~/routes/admin/users/create";
import AdminUsersEdit from "~/routes/admin/users/edit";
import ErrorPage from "~/routes/errorPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminBase />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
      {
        path: "users",
        element: <AdminUsersList />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",
        element: <AdminUsersShow />,
        loader: userLoader,
      },
      {
        path: "users/:userId/edit",
        element: <AdminUsersEdit />,
        loader: userLoader,
      },
      {
        path: "users/create",
        element: <AdminUsersCreate />,
      },
    ],
  },
];

export default routes;
