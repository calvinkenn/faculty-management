import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";

const GoalsItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="goals-container">
      <h1>Our Goal</h1>
      <div>
        To realize the vision and mission of the University, the College commits
        itself to:
      </div>
      <div>1.{props.item.g1}</div>
      <div>2.{props.item.g2}</div>
      <div>3.{props.item.g3}</div>
      <div>4.{props.item.g4}</div>
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
    </div>
  );
};

export default GoalsItem;
