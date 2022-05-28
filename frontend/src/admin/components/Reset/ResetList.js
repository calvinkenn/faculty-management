import React from "react";

import ResetItem from "./ResetItem";
import "../list.css";
import noData from "../../../assets/Image/no-data-found.png";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const ResetList = (props) => {
  if (props.list?.length === 0) {
    return (
      <div className="no-data-found">
        <img src={noData} />
        <h1>No Users Requesting Password Reset Found</h1>
      </div>
    );
  }
  return (
    <div className="list">
      {props.list
        // ?.sort((a, b) => (a[props.sortedData] > b[props.sortedData] ? 1 : -1))
        .map((reset) => (
          <ResetItem
            userId={reset._id}
            employeeNum={reset.employeeNum}
            firstName={reset.firstName}
            lastName={reset.lastName}
            email={reset.email}
            alternateEmail={reset.alternateEmail}
            reset={reset.faculty}
            faculty={reset.faculty}
            employmentType={reset.employmentType}
            updateResetUsers={props.updateResetUsers}
            profilePic={reset.profilePic}
            dateOfRegistration={
              reset.dateOfRegistration
                ? formatDate(reset.dateOfRegistration.substring(0, 10))
                : ""
            }
            id={reset._id}
          />
        ))}
    </div>
  );
};

export default ResetList;
