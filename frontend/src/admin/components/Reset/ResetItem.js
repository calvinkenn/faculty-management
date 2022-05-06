import React, { useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import profilePic from "../../../assets/Image/Qw.png";
import "../item.css";

const ResetItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

  const userResetHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/resetPasswordHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          newPass: props.lastName.toLowerCase() + props.employeeNum,
        }),
        { "Content-Type": "application/json" }
      );
      props.updateResetUsers(responseData.updatedUser, responseData.permission);
      console.log(responseData.permission);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
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
      <div>Faculty: {props.faculty ? props.faculty : "N/A"}</div>
      <div>
        Employment Type: {props.employmentType ? props.employmentType : "N/A"}
      </div>
      <Button onClick={userResetHandler}>Reset Password</Button>
    </Card>
  );
};

export default ResetItem;
