import React from "react";

import "./Goals.css";
import GoalsEdit from "./GoalsEdit";
import GoalsItem from "./GoalsItem";

const Goals = (props) => {
  if (props.isEditMode) {
    return (
      <GoalsEdit
        item={props.vmgo.goals}
        editModeHandler={props.updateEditModeState}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  } else {
    return (
      <GoalsItem
        item={props.vmgo.goals}
        editModeHandler={props.updateEditModeState}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  }
};

export default Goals;
