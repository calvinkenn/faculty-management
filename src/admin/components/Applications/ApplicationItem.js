import React, { useState } from "react";

import "./ApplicationItem.css";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";

const ApplicationItem = (props) => {
  return (
    <Card>
      <div>Employee Number: {props.employeeNum}</div>
      <div>First Name: {props.firstName}</div>
      <div>Last Name: {props.lastName}</div>
      <div>Registered Date: {props.date}</div>
      <div className="faculty-container__actions">
        <Button>Approve</Button>
        <Button danger>Reject</Button>
      </div>
    </Card>
  );
};

export default ApplicationItem;
