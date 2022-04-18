import React from "react";

import FacultyItem from "./FacultyItem";
import "./FacultyList.css";

const FacultyList = (props) => {
  return (
    <div className="faculty-list">
      {props.list.map((faculty) => (
        <FacultyItem
          employeeNum={faculty.employeeNum}
          firstName={faculty.firstName}
          lastName={faculty.lastName}
          profilePic={faculty.profilePic}
        />
      ))}
    </div>
  );
};

export default FacultyList;
