import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";

const VisionItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="vision-container">
      <h1>Our Vision</h1>
      <span>{props.item}</span>
      <div className="vission-edit">
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
      </div>
    </div>
  );
};

export default VisionItem;
