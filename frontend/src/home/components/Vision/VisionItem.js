import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";
import VisionIcon from "../../../assets/Image/vision.png";

const VisionItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="vision-container">
      <img src={VisionIcon} />
      <h1>Our Vision</h1>
      <span>{props.item}</span>
      <div className="vision-edit">
        {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
      </div>
    </div>
  );
};

export default VisionItem;
