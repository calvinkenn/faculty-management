import React, { useState, useEffect } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import SideBox from "../../shared/components/SideMenu/SideBox";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import Application from "../components/Applications/Application";
import Deactivated from "../components/Deactivated/Deactivated";
import Faculty from "../components/FacultyMembers/Faculty";
import Overview from "../components/Overview/Overview";
import Rejected from "../components/Rejected/Rejected";
import TopActionBarAdmin from "../TopActionBarAdmin";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Admin.css";
const menu = {
  overview: true,
  facultyMembers: false,
  inactive: false,
  applications: false,
  rejected: false,
};

const Admin = (props) => {
  const { isLoading, sendRequest, clearError } = useHttpClient();
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [pendingUserData, setPendingUserData] = useState();
  const [activeUserData, setActiveUserData] = useState();
  const [rejectedUserData, setRejectedUserData] = useState();
  const [deactivatedUserData, setDeactivatedUserData] = useState();
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPrintMode, setIsPrintMode] = useState(props.isPrintMode);

  const printModeHandler = () => {
    setIsPrintMode((prevState) => !prevState);
  };

  const menuChangeHandler = (menuName) => {
    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsMenuActive(stateCopy);
    setIsPrintMode(false);
    setSearchField("");
  };

  const updateUsers = (userData, status) => {
    setUpdatedStatus(status);
    // setActiveUserData(userData);
    // setPendingUserData(userData);
    // setRejectedUserData(userData);
    // setDeactivatedUserData(userData);
    if (status === "accepted") {
      setSuccess("Account Accepted");
    } else {
      setError("Account Rejected");
    }
  };

  useEffect(() => {
    //Get active users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getActiveUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/getAllActiveUsers"
        );
        // const responseData = await response.json();
        setActiveUserData(responseData.activeUsers);
      } catch (err) {}
    };
    getActiveUsers();
    setUpdatedStatus("");
  }, [sendRequest, updatedStatus]);

  useEffect(() => {
    //Get pending users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getPendingUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/getAllPendingUsers"
        );
        // const responseData = await response.json();
        setPendingUserData(responseData.pendingUsers);
      } catch (err) {}
    };
    getPendingUsers();
    setUpdatedStatus("");
  }, [sendRequest, updatedStatus]);

  useEffect(() => {
    //Get rejected users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getRejectedUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/getAllRejectedUsers"
        );
        // const responseData = await response.json();
        setRejectedUserData(responseData.rejectedUsers);
      } catch (err) {}
    };
    getRejectedUsers();
    setUpdatedStatus("");
  }, [sendRequest, updatedStatus]);

  useEffect(() => {
    //Get deactivated users
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getDeactivatedUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/getAllDeactivatedUsers"
        );
        // const responseData = await response.json();
        setDeactivatedUserData(responseData.deactivatedUsers);
      } catch (err) {}
    };
    getDeactivatedUsers();
    setUpdatedStatus("");
  }, [sendRequest, updatedStatus]);

  const clearModals = () => {
    setError(null);
    setSuccess(null);
  };

  //SEARCH-----------------------------------------------------------------------
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredActiveUsers = activeUserData?.filter((activeUser) => {
    return (
      activeUser.firstName?.toLowerCase().includes(searchField.toLowerCase()) ||
      activeUser.lastName?.toLowerCase().includes(searchField.toLowerCase()) ||
      activeUser.email?.toLowerCase().includes(searchField.toLowerCase()) ||
      activeUser.employeeNum?.toString().includes(searchField)
    );
  });

  const filteredDeactivatedUsers = deactivatedUserData?.filter(
    (deactivatedUser) => {
      return (
        deactivatedUser.firstName
          ?.toLowerCase()
          .includes(searchField.toLowerCase()) ||
        deactivatedUser.lastName
          ?.toLowerCase()
          .includes(searchField.toLowerCase()) ||
        deactivatedUser.email
          ?.toLowerCase()
          .includes(searchField.toLowerCase()) ||
        deactivatedUser.employeeNum?.toString().includes(searchField)
      );
    }
  );

  const filteredPendingUsers = pendingUserData?.filter((pendingUser) => {
    return (
      pendingUser.firstName
        ?.toLowerCase()
        .includes(searchField.toLowerCase()) ||
      pendingUser.lastName?.toLowerCase().includes(searchField.toLowerCase()) ||
      pendingUser.email?.toLowerCase().includes(searchField.toLowerCase()) ||
      pendingUser.employeeNum?.toString().includes(searchField)
    );
  });

  const filteredRejectedUsers = rejectedUserData?.filter((rejectedUser) => {
    return (
      rejectedUser.firstName
        ?.toLowerCase()
        .includes(searchField.toLowerCase()) ||
      rejectedUser.lastName
        ?.toLowerCase()
        .includes(searchField.toLowerCase()) ||
      rejectedUser.email?.toLowerCase().includes(searchField.toLowerCase()) ||
      rejectedUser.employeeNum?.toString().includes(searchField)
    );
  });

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
                  className={isMenuActive.overview ? "active" : ""}
                  onClick={() => menuChangeHandler("overview")}
                >
                  Overview
                </li>
                <li
                  className={isMenuActive.facultyMembers ? "active" : ""}
                  onClick={() => menuChangeHandler("facultyMembers")}
                >
                  Faculty Members
                </li>
                <li
                  className={isMenuActive.inactive ? "active" : ""}
                  onClick={() => menuChangeHandler("inactive")}
                >
                  Deactivated Accounts
                </li>
                <li
                  className={isMenuActive.applications ? "active" : ""}
                  onClick={() => menuChangeHandler("applications")}
                >
                  Pending Applications
                </li>
                <li
                  className={isMenuActive.rejected ? "active" : ""}
                  onClick={() => menuChangeHandler("rejected")}
                >
                  Rejected Applications
                </li>
              </ul>
            </SideBox>
            <div className="content-container">
              <TopActionBarAdmin
                inOverview={isMenuActive.overview}
                onSearchChange={onSearchChange}
                searchValue={searchField}
                printMode={printModeHandler}
                isPrintMode={isPrintMode}
              />
              {isMenuActive.overview && (
                <Overview
                  activeUserData={activeUserData}
                  pendingUserData={pendingUserData}
                  deactivatedUserData={deactivatedUserData}
                  rejectedUserData={rejectedUserData}
                  isPrintMode={isPrintMode}
                />
              )}
              {isMenuActive.facultyMembers && (
                <Faculty
                  activeUserData={filteredActiveUsers}
                  updateActiveUsers={updateUsers}
                />
              )}
              {isMenuActive.applications && (
                <Application
                  pendingUserData={filteredPendingUsers}
                  updatePendingUsers={updateUsers}
                />
              )}
              {isMenuActive.inactive && (
                <Deactivated
                  deactivatedUserData={filteredDeactivatedUsers}
                  updateDeactivatedUsers={updateUsers}
                />
              )}
              {isMenuActive.rejected && (
                <Rejected
                  rejectedUserData={filteredRejectedUsers}
                  updateRejectedUsers={updateUsers}
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
