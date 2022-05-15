import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import "./AnnounceFull.css";

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

const AnnounceFull = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [announcementData, setAnnouncementData] = useState([]);
  const announceId = useParams().annID;

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
  }, []);

  console.log(announcementData);

  return (
    <div className="announce-main">
      <div className="announce-main-container">
        <MainNavigation inHome={true} />
        {announcementData?.map((item) => {
          if (item._id === announceId) {
            return (
              <div className="announce-container">
                <div className="content-title"><h2>{item.title}</h2></div>
                <div className="content-author-date">
                  <div className="content-date-created">{formatDateLong(item.date)}</div>
                  <span />
                  <div className="content-author">Author: {item.author}</div>
                </div>
                {item.editDate ? (
                  <div className="content-date-edited">Date Edited: {formatDateLong(item.editDate)}</div>
                ) : (
                  ""
                )}
                <div className="content-img-container">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt="Announcement"
                  />
                </div>
                <div className="content-contain">{item.content}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AnnounceFull;
