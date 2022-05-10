import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";

const MissionItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="mission-container">
      <h1>Our Mission</h1>
      {props.item}
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
  );
};

export default MissionItem;
