import { NavLink, Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/passwords">Passwords</NavLink>
        <NavLink to="/deleted">Deleted</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
