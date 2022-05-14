import React, { useState, useEffect } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Announcement from "../components/Announcements/Announcement";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Announce.css";

const Announce = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const editModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const addModeHandler = () => {
    setIsAddMode((prevState) => !prevState);
  };

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/vmgo/getAnnouncements"
        );
        // setVMGOData(responseData.announcement);
      } catch (err) {
        console.log(err);
      }
    };
    getAnnouncements();
  }, []);

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
