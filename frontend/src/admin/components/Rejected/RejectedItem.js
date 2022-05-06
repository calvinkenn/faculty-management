import React, { useState } from "react";

import "../item.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";

const RejectedItem = (props) => {
  const { isLoading, error, success, sendRequest } = useHttpClient();
  //handler for account approval
  const userApproveHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: event.target.userId.value,
          permissionUpdate: "pending",
        }),
        { "Content-Type": "application/json" }
      );
      props.updateRejectedUsers(
        responseData.pendingUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div>Employee Number: {props.employeeNum}</div>
      <div>First Name: {props.firstName}</div>
      <div>Last Name: {props.lastName}</div>
      <div>Email: {props.email}</div>
      <div className="container__actions">
        <form onSubmit={userApproveHandler}>
          <input type="hidden" value={props.id} name="userId"></input>
          <Button type="submit">Back to Pending</Button>
        </form>
      </div>
    </Card>
  );
};

export default RejectedItem;
