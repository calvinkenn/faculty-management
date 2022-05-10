import React from "react";

import AnnouncementItem from "./AnnouncementItem";
import "./AnnouncementList.css";

const AnnouncementList = (props) => {
  if (props.item.length === 0) {
    return <div>no announcement</div>;
  }
  return (
    <div className="announcement-list">
      {props.item.map((item) => (
        <AnnouncementItem
          id={item.id}
          title={item.title}
          author={item.author}
          date={item.date}
          content={item.content}
          image={item.image}
          setIsEditModeHandler={props.setIsEditModeHandler}
        />
      ))}
    </div>
  );
};

export default AnnouncementList;
