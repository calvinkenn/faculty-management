import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";

const ObjectivesItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="objectives-container">
      <h1>Bachelor of Science in Information Technology Program Objectives</h1>
      <div>The following are the objectives of the BSIT program:</div>
      <div>1.{props.item_IT.o1}</div>
      <div>2.{props.item_IT.o2}</div>
      <div>3.{props.item_IT.o3}</div>
      <div>4.{props.item_IT.o4}</div>
      <br />
      <h1>Bachelor of Library and Information Science Program Objectives</h1>
      <div>The following are the objectives of the BLIS program:</div>
      <div>1.{props.item_BLIS.o1}</div>
      <div>2.{props.item_BLIS.o2}</div>
      <div>3.{props.item_BLIS.o3}</div>
      <div>4.{props.item_BLIS.o4}</div>
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
  );
};

export default ObjectivesItem;
