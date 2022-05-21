import React from "react";

import RejectedItem from "./RejectedItem";
import "../list.css";
import noData from "../../../assets/Image/no-data-found.png";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const RejectedList = (props) => {
  if (props.list?.length === 0) {
    return <div className="no-data-found">
      <img src={noData} />
      <h1>No Rejected Users Found</h1>
    </div>;
  }
  return (
    <div className="list">
      {props.list
        // ?.sort((a, b) => (a[props.sortedData] > b[props.sortedData] ? 1 : -1))
        .map((application) => (
          <RejectedItem
            employeeNum={application.employeeNum}
            firstName={application.firstName}
            lastName={application.lastName}
            email={application.email}
            deactivateNote={application.deactivateNote}
            id={application._id}
            dateOfRegistration={
              application.dateOfRegistration
                ? formatDate(application.dateOfRegistration.substring(0, 10))
                : ""
            }
            updateRejectedUsers={props.updateRejectedUsers}
          />
        ))}
    </div>
  );
};

export default RejectedList;
