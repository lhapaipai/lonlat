import { Link, Outlet } from "react-router-dom";
import "./_base.scss";
import logoUrl from "@lonlat/shared/images/logo.svg";

export default function Base() {
  return (
    <>
      <div id="sidebar">
        <h1>
          <img src={logoUrl} width="32" height="32" />
          Administration
        </h1>
        <nav>
          <li>
            <Link to="/">Retour site public</Link>
          </li>
          <li>
            <Link to="/admin/users">Liste utilisateurs</Link>
          </li>
          <li>
            <Link to="/admin/users/create">Créer un utilisateur</Link>
          </li>
        </nav>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
