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
      <h1 className="course">Bachelor of Science in Information Technology Program Objectives</h1>
      <div>The following are the objectives of the BSIT program:</div>
      {props.item_IT?.map((item, index) => (
        <span>
          {" "}
          {index + 1}. {item.bsitObjectives}
        </span>
      ))}
      <br />
      <h1 className="course">Bachelor of Library and Information Science Program Objectives</h1>
      <div>The following are the objectives of the BLIS program:</div>
      {props.item_BLIS?.map((item, index) => (
        <span>
          {" "}
          {index + 1}. {item.blisObjectives}
        </span>
      ))}
      <div className="obj-edit">
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
    </div>
  );
};

export default ObjectivesItem;
