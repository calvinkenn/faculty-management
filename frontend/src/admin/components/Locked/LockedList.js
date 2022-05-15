import React from "react";

import LockedItem from "./LockedItem";
import "../list.css";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const LockedList = (props) => {
  if (props.list?.length === 0) {
    return <div>No locked users found</div>;
  }
  return (
    <div className="list">
      {props.list
        // ?.sort((a, b) => (a[props.sortedData] > b[props.sortedData] ? 1 : -1))
        .map((reset) => (
          <LockedItem
            userId={reset._id}
            employeeNum={reset.employeeNum}
            firstName={reset.firstName}
            lastName={reset.lastName}
            email={reset.email}
            reset={reset.faculty}
            faculty={reset.faculty}
            employmentType={reset.employmentType}
            updateLockedUsers={props.updateLockedUsers}
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

export default LockedList;
