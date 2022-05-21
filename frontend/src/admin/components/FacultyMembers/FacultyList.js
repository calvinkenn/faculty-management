import React from "react";

import FacultyItem from "./FacultyItem";
import "../list.css";
import noData from "../../../assets/Image/no-data-found.png";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const FacultyList = (props) => {
  if (props.list?.length === 0) {
    return <div className="no-data-found">
      <img src={noData} />
      <h1>No Active Users Found</h1>
    </div>;
  }

  console.log(props.sortedData);
  return (
    <div className="list">
      {props.list
        // ?.sort((a, b) => (a[props.sortedData] > b[props.sortedData] ? 1 : -1))
        .map((faculty) => (
          <FacultyItem
            userId={faculty._id}
            employeeNum={faculty.employeeNum}
            firstName={faculty.firstName}
            lastName={faculty.lastName}
            email={faculty.email}
            faculty={faculty.faculty}
            employmentType={faculty.employmentType}
            updateActiveUsers={props.updateActiveUsers}
            profilePic={faculty.profilePic}
            dateOfRegistration={
              faculty.dateOfRegistration
                ? formatDate(faculty.dateOfRegistration.substring(0, 10))
                : ""
            }
            id={faculty._id}
          />
        ))}
    </div>
  );
};

export default FacultyList;
