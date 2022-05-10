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
      {props.item}
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
  );
};

export default VisionItem;
