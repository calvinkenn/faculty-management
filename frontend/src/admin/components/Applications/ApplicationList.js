import React from "react";

import ApplicationItem from "./ApplicationItem";
import "../list.css";
import noData from "../../../assets/Image/no-data-found.png";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const ApplicationList = (props) => {
  if (props.list?.length === 0) {
    return <div className="no-data-found">
      <img src={noData} />
      <h1>No Pending Users Found</h1>
    </div>;
  }
  console.log(props.sortedData);
  return (
    <div className="list">
      {props?.list
        // ?.sort((a, b) => (a[props.sortedData] < b[props.sortedData] ? 1 : -1))
        .map((application) => (
          <ApplicationItem
            employeeNum={application.employeeNum}
            firstName={application.firstName}
            lastName={application.lastName}
            email={application.email}
            dateOfRegistration={
              application.dateOfRegistration
                ? formatDate(application.dateOfRegistration.substring(0, 10))
                : ""
            }
            id={application._id}
            updatePendingUsers={props.updatePendingUsers}
          />
        ))}
    </div>
  );
};

export default ApplicationList;
