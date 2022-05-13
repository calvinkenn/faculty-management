import React from "react";

import "./Mission.css";
import MissionEdit from "./MissionEdit";
import MissionItem from "./MissionItem";

const Mission = (props) => {
  if (props.isEditMode) {
    return (
      <MissionEdit
        editModeHandler={props.updateEditModeState}
        item={props.vmgo.mission}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  } else {
    return (
      <MissionItem
        item={props.vmgo.mission}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Mission;
