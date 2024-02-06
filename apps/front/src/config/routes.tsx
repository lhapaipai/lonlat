import { RouteObject } from "react-router-dom";
import Base from "~/routes/_base";
import AdminBase from "~/routes/admin/_base";

import Index from "~/routes/_index";
import AdminUsersList, { usersLoader } from "~/routes/admin/users/_index";
import AdminIndex from "~/routes/admin/_index";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Base />,
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
    ],
  },
];

export default routes;
