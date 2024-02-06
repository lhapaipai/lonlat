import { Link, Outlet } from "react-router-dom";

export default function Base() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Welcome</Link>
          </li>
          <li>
            <Link to="/admin">Interface administration</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
