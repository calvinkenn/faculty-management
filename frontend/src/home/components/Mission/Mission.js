import React from "react";

import "./Mission.css";
import MissionEdit from "./MissionEdit";
import MissionItem from "./MissionItem";

const DUMMY_DATA = {
  mission:
    "Bulacan State University is a progressive knowledge-generating institution globally recognized for excellent instruction, pioneering research, and responsive community engagements.",
};

const Mission = (props) => {
  if (props.isEditMode) {
    return <MissionEdit editModeHandler={props.updateEditModeState} />;
  } else {
    return (
      <MissionItem
        item={DUMMY_DATA.mission}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Mission;
