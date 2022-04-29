import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          <NotificationsRoundedIcon sx={{ fontSize: 35, color: "#292929" }}/>
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>
            <ExitToAppIcon sx={{ fontSize: 35, color: "#292929" }}/>
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
