import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Announcement from "../components/Announcements/Announcement";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Announce.css";

const Announce = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [announcementData, setAnnouncementData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [message, setMessage] = useState("");

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
          "http://localhost:5000/api/announcement/getAnnouncements"
        );
        setAnnouncementData(responseData.announcement);
      } catch (err) {
        console.log(err);
      }
    };
    getAnnouncements();
  }, [message]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const clearAnnouncement = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/announcement/clearAnnouncementCount",
          "PATCH",
          JSON.stringify({
            userId: storedData.userId,
          }),
          { "Content-Type": "application/json" }
        );
      } catch (err) {
        console.log(err);
      }
    };
    clearAnnouncement();
  }, []);

  const messageHandler = (message) => {
    setMessage(message);
    setIsAddMode(false);
    setIsEditMode(false);
  };

  const clearSuccess = () => {
    setMessage("");
  };

  return (
    <React.Fragment>
      <SuccessModal success={message} onClear={clearSuccess} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="home-main">
        <div className="home-main-container">
          <MainNavigation inHome={true} />
          <div className="announcement-container">
            <Announcement
              isAddMode={isAddMode}
              isEditMode={isEditMode}
              updateEditModeState={editModeHandler}
              updateAddModeState={addModeHandler}
              announcementData={announcementData}
              messageHandler={messageHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Announce;
