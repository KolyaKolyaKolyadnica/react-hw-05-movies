import { NavLink, Outlet } from 'react-router-dom';
import style from './Navigation.module.css';

function Navigation() {
  return (
    <>
      <nav>
        <ul className={style.list}>
          <li className={style.listItem}>
            <NavLink
              // react-hw-05-movies
              to="/"
              className={({ isActive }) =>
                isActive ? style.activeLink : style.link
              }
            >
              Home
            </NavLink>
          </li>

          <li className={style.listItem}>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? style.activeLink : style.link
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr></hr>

      <Outlet />
    </>
  );
}

export default Navigation;
