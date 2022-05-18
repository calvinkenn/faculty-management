import React, { useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

const NavLinks = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const userIdByParams = useParams().userId;

  const showLogoutHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelLogoutHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header="Logout?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={auth.logout}>
              YES
            </Button>
            <Button onClick={cancelLogoutHandler}>NO</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      <ul className="nav-links">
        {auth.isLoggedIn && userIdByParams && (
          <li>
            <NavLink to="/" exact>
              <ArrowBackIcon sx={{fontSize: '35px'}}/> Admin
            </NavLink>
          </li>
        )}
        {!auth.isAdmin && props.inHome && (
          <li>
            <NavLink to="/profile" exact>
              View Profile
            </NavLink>
          </li>
        )}
        {auth.isAdmin && props.inHome && (
          <li>
            <NavLink to="/admin" exact>
              View Admin
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && props.inProfile && (
          <li>
            <NavLink to="/announcement" exact>
              {!auth.isAdmin && props.announcementCount > 0 ? (
                <div className="announcement-count">
                  {props.announcementCount}
                </div>
              ) : (
                ""
              )}
              <NotificationsNoneIcon sx={{fontSize: '35px'}}/>
            </NavLink>
          </li>
        )}
        {props.inProfile && (
          <li>
            <NavLink to="/vmgo" exact>
              <FeedOutlinedIcon sx={{fontSize: '35px'}}/>
            </NavLink>
          </li>
        )}

        {!auth.isAdmin && props.inVMGO && (
          <li>
            <NavLink to="/profile" exact>
              View Profile
            </NavLink>
          </li>
        )}

        {auth.isAdmin && props.inVMGO && (
          <li>
            <NavLink to="/admin" exact>
              View Admin
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <button onClick={showLogoutHandler}>
              <ExitToAppIcon sx={{ fontSize: 35, color: "#292929" }} />
            </button>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
