import React, { useState, useEffect } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import SideBox from "../../shared/components/SideMenu/SideBox";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import Application from "../components/Applications/Application";
import Faculty from "../components/FacultyMembers/Faculty";
import TopActionBarAdmin from "../TopActionBarAdmin";
import "./Admin.css";
const menu = {
  facultyMembers: true,
  applications: false,
};

const Admin = (props) => {
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [pendingUserData, setPendingUserData] = useState([{}]);
  const [activeUserData, setActiveUserData] = useState([{}]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const menuChangeHandler = (menuName) => {
    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsMenuActive(stateCopy);
  };

  useEffect(() => {
    //Get active users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:5000/api/admin/getAllActiveUsers",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = await response.json();
      setActiveUserData(responseData.activeUsers);
    };
    sendRequest();
  }, []);

  useEffect(() => {
    //Get pending users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:5000/api/admin/getAllPendingUsers",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = await response.json();
      setPendingUserData(responseData.pendingUsers);
    };
    sendRequest();
  }, []);

  const updatePendingUsers = (userData, status) => {
    setPendingUserData(userData);
    if (status == "accepted") {
      setSuccess("Account Accepted");
    } else {
      setError("Account Rejected");
    }
  };
  const clearModals = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <React.Fragment>
      <div className="admin-main">
        <div className="admin-side-nav">
          <div className="side-nav-menu">{/* <MenuIcon /> */}</div>
        </div>
        <div className="user-main-container">
          <SuccessModal success={success} onClear={clearModals} />
          <ErrorModal error={error} onClear={clearModals} />
          <MainNavigation />
          <div className="profile-container">
            <SideBox className="side-container">
              <ul>
                <li
                  className={isMenuActive.facultyMembers ? "active" : ""}
                  onClick={() => menuChangeHandler("facultyMembers")}
                >
                  Faculty Members
                </li>
                <li
                  className={isMenuActive.applications ? "active" : ""}
                  onClick={() => menuChangeHandler("applications")}
                >
                  Pending Applications
                </li>
              </ul>
            </SideBox>
            <div className="content-container">
              <TopActionBarAdmin />
              {isMenuActive.facultyMembers && (
                <Faculty activeUserData={activeUserData} />
              )}
              {isMenuActive.applications && (
                <Application
                  pendingUserData={pendingUserData}
                  updatePendingUsers={updatePendingUsers}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
