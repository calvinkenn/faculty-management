import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const userIdByParams = useParams().userId;

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && userIdByParams && (
        <li>
          <NavLink to="/" exact>
            Back to Admin
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/" exact>
          <NotificationsRoundedIcon sx={{ fontSize: 35, color: "#292929" }} />
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>
            <ExitToAppIcon sx={{ fontSize: 35, color: "#292929" }} />
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
