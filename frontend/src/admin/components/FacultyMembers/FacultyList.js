import React from "react";

import FacultyItem from "./FacultyItem";
import "./FacultyList.css";

const FacultyList = (props) => {
  if (props.list.length === 0) {
    return <div>No active users found</div>;
  }
  return (
    <div className="faculty-list">
      {props.list.map((faculty) => (
        <FacultyItem
          employeeNum={faculty.employeeNum}
          firstName={faculty.firstName}
          lastName={faculty.lastName}
          profilePic={"https://robohash.org/" + faculty.employeeNum}
        />
      ))}
    </div>
  );
};

export default FacultyList;
