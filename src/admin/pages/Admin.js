import React, { useState } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import SideBox from "../../shared/components/SideMenu/SideBox";
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

  const menuChangeHandler = (menuName) => {
    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsMenuActive(stateCopy);
  };

  return (
    <React.Fragment>
      <MainNavigation />
      <div className="admin-container">
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
        <div style={{ width: "100%" }}>
          <TopActionBarAdmin />
          {isMenuActive.facultyMembers && <Faculty />}
          {isMenuActive.applications && <Application />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
