import React, { useState } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Announcement from "../components/Announcements/Announcement";
import "./Announce.css";

const Announce = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const editModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const addModeHandler = () => {
    setIsAddMode((prevState) => !prevState);
  };
  

  return (
    <React.Fragment>
      <div className="home-main">
        <div className="home-main-container">
          <MainNavigation inHome={true} />
          <div className="announcement-container">
            <Announcement
              isAddMode={isAddMode}
              isEditMode={isEditMode}
              updateEditModeState={editModeHandler}
              updateAddModeState={addModeHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Announce;
