import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
// import SideDrawer from './SideDrawer';
// import Backdrop from '../UIElements/Backdrop';
import "./MainNavigation.css";
import bulsuLogo from "../../../assets/Image/bulsu.png";
import cictLogo from "../../../assets/Image/cict.png";

const MainNavigation = (props) => {
  // const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // const openDrawerHandler = () => {
  //   setDrawerIsOpen(true);
  // };

  // const closeDrawerHandler = () => {
  //   setDrawerIsOpen(false);
  // };

  return (
    <React.Fragment>
      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/">
            <div className="nav-logo-main-cont">
              <img src={bulsuLogo} />
              <img src={cictLogo} />
            </div>
            <div className="nav-title-cont">
              <h4>College of Information and Communications Technology</h4>
            </div>
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks
            inProfile={props.inProfile}
            inHome={props.inHome}
            inVMGO={props.inVMGO}
            announcementCount={props.announcementCount}
          />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
