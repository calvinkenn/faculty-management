import React, { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Announcement from "../components/Announcements/Announcement";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Announce.css";

const formatDateLong = (date) => {
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const month1 = formatter.format(new Date(date));
  return month1;
};

const Announce = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [announcementData, setAnnouncementData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [message, setMessage] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filterValue, setFilterValue] = useState(new Date());
  const [displayFilterValue, setDisplayFilterValue] = useState(1);

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

  //SEARCH-----------------------------------------------------------------------
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const searchResults = announcementData?.filter((announcement) => {
    let date = formatDateLong(announcement.date);
    return (
      announcement.title?.toLowerCase().includes(searchField.toLowerCase()) ||
      announcement.author?.toLowerCase().includes(searchField.toLowerCase()) ||
      announcement.content?.toLowerCase().includes(searchField.toLowerCase()) ||
      date?.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  //FILTER
  const onFilterChange = (value) => {
    setFilterValue(value);
  };

  const onDisplayFilterChange = (event) => {
    setDisplayFilterValue(event.target.value);
    setFilterValue(new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              announcementData={searchResults}
              messageHandler={messageHandler}
              onSearchChange={onSearchChange}
              filterValue={filterValue}
              onFilterChange={onFilterChange}
              onDisplayFilterChange={onDisplayFilterChange}
              displayFilterValue={displayFilterValue}
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Announce;
