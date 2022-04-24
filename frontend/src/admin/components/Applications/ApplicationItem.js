import React, { useState } from "react";

import "./ApplicationItem.css";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";

const ApplicationItem = (props) => {


  //handler for account approval
  const userApproveHandler =  async (event) =>{
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/admin/acceptPendingUser", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: event.target.userId.value,
      }),
    });
    const responseData = await response.json();
    props.updatePendingUsers(responseData.pendingUsers, responseData.accept);
  };
  //handler for account rejection
  const userRejectHandler = async (event) =>{
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/admin/rejectPendingUser", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: event.target.userId.value,
      }),
    });
    const responseData = await response.json();
    props.updatePendingUsers(responseData.pendingUsers, responseData.reject);
  };
  return (
    <Card>
      <div>Employee Number: {props.employeeNum}</div>
      <div>First Name: {props.firstName}</div>
      <div>Last Name: {props.lastName}</div>
      <div>Registered Date: {props.date}</div>
      <div className="faculty-container__actions">
        <form onSubmit={userApproveHandler}>
          <input type="hidden" value = {props.id} name = "userId"></input>
        <Button type = "submit">Approve</Button>
        </form>
        <form onSubmit={userRejectHandler}>
          <input type="hidden" value = {props.id} name = "userId"></input>
        <Button danger type = "submit">Reject</Button>
        </form>
      </div>
    </Card>
  );
};

export default ApplicationItem;
