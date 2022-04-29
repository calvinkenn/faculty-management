import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import profilePic from "../../../assets/Image/Qw.png";
import "../item.css";

const FacultyItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

  const userDeactivateHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          permissionUpdate: "deactivated",
        }),
        { "Content-Type": "application/json" }
      );
      props.updateActiveUsers(
        responseData.activeUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <Link to={`/admin/profile/${props.userId}`}>
        <div className="container__image">
          <img
            src={
              props.profilePic !== ""
                ? `http://localhost:5000/${props.profilePic}`
                : profilePic
            }
            alt={props.firstName}
          />
        </div>
        <div>Employee Number: {props.employeeNum}</div>
        <div>First Name: {props.firstName}</div>
        <div>Last Name: {props.lastName}</div>
        <div>Email: {props.email}</div>
        <div>Faculty: {props.faculty}</div>
        <div>Employment Type: {props.employmentType}</div>
      </Link>
      <Button onClick={userDeactivateHandler}>Deactive Account</Button>
    </Card>
  );
};

export default FacultyItem;
