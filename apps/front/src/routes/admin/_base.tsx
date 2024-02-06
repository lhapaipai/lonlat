import { Link, Outlet } from "react-router-dom";
import "./_base.scss";

export default function Base() {
  return (
    <>
      <div id="sidebar">
        <h1>Interface Admin</h1>
        <li>
          <Link to="/">Retour site public</Link>
        </li>
        <li>
          <Link to="/admin/users">Liste utilisateurs</Link>
        </li>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
