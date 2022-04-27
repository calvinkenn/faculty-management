import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./FacultyItem.css";
import Card from "../../../shared/components/UIElements/Card";

const FacultyItem = (props) => {
  return (
    <Card>
      <Link to={`/admin/profile/${props.userId}`}>
        <div className="faculty-container__image">
          <img src={props.profilePic} alt={props.firstName} />
        </div>
        <div>Employee Number: {props.employeeNum}</div>
        <div>First Name: {props.firstName}</div>
        <div>Last Name: {props.lastName}</div>
      </Link>
    </Card>
  );
};

export default FacultyItem;
