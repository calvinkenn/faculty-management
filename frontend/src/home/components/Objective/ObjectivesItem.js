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
      {props.item_IT?.map((item, index) => (
        <div>
          {" "}
          {index + 1}. {item.bsitObjectives}
        </div>
      ))}
      <br />
      <h1>Bachelor of Library and Information Science Program Objectives</h1>
      <div>The following are the objectives of the BLIS program:</div>
      {props.item_BLIS?.map((item, index) => (
        <div>
          {" "}
          {index + 1}. {item.blisObjectives}
        </div>
      ))}
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
  );
};

export default ObjectivesItem;
