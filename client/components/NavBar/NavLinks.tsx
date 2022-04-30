import { NextPage } from "next";
import { UserConsumer } from "../../context/UserContext";
import NavLink from "./NavLink";

// All nav links
const NavLinks: NextPage = () => {
  return (
    <ul className="menu menu-horizontal p-0">
      <li>
        <NavLink title="Home" href="/" />
      </li>
      <li>
        <NavLink title="Terms of Service" href="/tos" />
      </li>
      <UserConsumer>
        {(user) =>
          user == null ? (
            <li>
              <NavLink title="Login" href="/login" />
            </li>
          ) : (
            <li>
              <NavLink title="Dashboard" href="/dashboard" />
              <NavLink title="Logout" href="/logout" />
            </li>
          )
        }
      </UserConsumer>
    </ul>
  );
};

export default NavLinks;
