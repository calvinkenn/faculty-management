import React from "react";

import FacultyItem from "./FacultyItem";
import "../list.css";

const FacultyList = (props) => {
  if (props.list.length === 0) {
    return <div>No active users found</div>;
  }
  return (
    <div className="list">
      {props.list.map((faculty) => (
        <FacultyItem
          userId={faculty._id}
          employeeNum={faculty.employeeNum}
          firstName={faculty.firstName}
          lastName={faculty.lastName}
          email={faculty.email}
          faculty={faculty.faculty}
          employmentType={faculty.employmentType}
          updateActiveUsers={props.updateActiveUsers}
          profilePic={"https://robohash.org/" + faculty.employeeNum}
          id={faculty._id}
        />
      ))}
    </div>
  );
};

export default FacultyList;
