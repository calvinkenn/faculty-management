import React from "react";

import AnnouncementItem from "./AnnouncementItem";
import "./AnnouncementList.css";

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

const AnnouncementList = (props) => {
  if (props.items?.length === 0) {
    return <div>no announcement</div>;
  }
  return (
    <React.Fragment>
      <div className="announcement-list">
        {props.items?.map((item) => (
          <AnnouncementItem
            id={item._id}
            title={item.title}
            author={item.author}
            date={formatDateLong(item.date)}
            editDate={(item.editDate ? formatDateLong(item.editDate) : "")}
            content={item.content}
            image={item.image}
            setIsEditModeHandler={props.setIsEditModeHandler}
            messageHandler={props.messageHandler}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default AnnouncementList;
