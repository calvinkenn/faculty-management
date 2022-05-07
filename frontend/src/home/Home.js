import React from "react";

import MainNavigation from "../shared/components/Navigation/MainNavigation";
import Announcement from "./components/Announcements/Announcement";
import Vmgo from "./components/Vmgo/Vmgo";
import "./Home.css";

const Home = (props) => {
  return (
    <React.Fragment>
      <div className="home-main">
        <div className="home-main-container">
          <MainNavigation />
          <div className="vmgo-container">
            <Vmgo />
            <Vmgo />
            <Vmgo />
          </div>
          <div className="announcement-container">
            <Announcement />
            <Announcement />
            <Announcement />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
