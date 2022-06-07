import React, { useState, useContext, useEffect, useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import profile from "../../../assets/Image/Qw.png";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const NavLinks = (props) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userData, setUserData] = useState();
  const auth = useContext(AuthContext);
  const userIdByParams = useParams().userId;
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    //Get Basic Info
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/userData",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
            token: storedData.token,
          }),
          { "Content-Type": "application/json" }
        );
        setUserData(responseData.userData);
      } catch (err) {}
    };
    getCurrentUser();
  }, [firstName]);

  const showLogoutHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelLogoutHandler = () => {
    setShowConfirmModal(false);
  };

  let navigate = useNavigate();

  const goToAnnouncement = () => {
    let path = `/announcement`;
    navigate(path);
  };

  const goToVMGO = () => {
    let path = `/vmgo`;
    navigate(path);
  };

  const goToHome = () => {
    let path = `/`;
    navigate(path);
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
            <Button danger onClick={cancelLogoutHandler}>
              NO
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      {isLoading && <LoadingSpinner asOverlay />}
      <div class="dropdown">
        <button onClick={goToHome} class="dropbtn">
          <div class="drop-profile">
            <img
              src={
                auth.isAdmin
                  ? profile
                  : userData && userData.profilePic
                  ? `http://localhost:5000/${userData.profilePic}`
                  : profile
              }
              alt="profile-pic"
            />
            {auth.isAdmin ? "Admin" : userData?.firstName}
          </div>
        </button>
        <ul class="dropdown-content">
          <li
            onClick={goToAnnouncement}
            className={props.inHome ? "active" : ""}
          >
            <div>
              <NotificationsNoneIcon sx={{ fontSize: "35px" }} />{" "}
              <p>Announcements</p>
              {!auth.isAdmin && props.announcementCount > 0 ? (
                <div className="announcement-count">
                  <p>{props.announcementCount}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </li>
          <li onClick={goToVMGO} className={props.inVMGO ? "active" : ""}>
            <div>
              <FeedOutlinedIcon sx={{ fontSize: "35px" }} /> <p>VMGO</p>
            </div>
          </li>
          <li onClick={showLogoutHandler}>
            <div>
              <ExitToAppIcon sx={{ fontSize: 35, color: "#292929" }} />
              <p>Logout</p>
            </div>
          </li>
        </ul>
      </div>

      {/* <ul className="nav-links">
        {auth.isLoggedIn && userIdByParams && (
          <li>
            <NavLink to="/" exact>
              <ArrowBackIcon sx={{ fontSize: "35px" }} /> Admin
            </NavLink>
          </li>
        )}
        {!auth.isAdmin && props.inHome && (
          <li>
            <NavLink to="/profile" exact>
              <ArrowBackIcon sx={{ fontSize: "35px" }} /> Profile
            </NavLink>
          </li>
        )}
        {auth.isAdmin && props.inHome && (
          <li>
            <NavLink to="/admin" exact>
              <ArrowBackIcon sx={{ fontSize: "35px" }} /> Admin
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
              <NotificationsNoneIcon sx={{ fontSize: "35px" }} />
            </NavLink>
          </li>
        )}
        {props.inProfile && (
          <li>
            <NavLink to="/vmgo" exact>
              <FeedOutlinedIcon sx={{ fontSize: "35px" }} />
            </NavLink>
          </li>
        )}

        {!auth.isAdmin && props.inVMGO && (
          <li>
            <NavLink to="/profile" exact>
              <ArrowBackIcon sx={{ fontSize: "35px" }} /> Profile
            </NavLink>
          </li>
        )}

        {auth.isAdmin && props.inVMGO && (
          <li>
            <NavLink to="/admin" exact>
              <ArrowBackIcon sx={{ fontSize: "35px" }} /> Admin
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
      </ul> */}
    </React.Fragment>
  );
};

export default NavLinks;
