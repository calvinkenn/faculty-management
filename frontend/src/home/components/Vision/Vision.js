import React from "react";

import "./Vision.css";
import VisionEdit from "./VisionEdit";
import VisionItem from "./VisionItem";

const Vision = (props) => {
  if (props.isEditMode) {
    return (
      <VisionEdit
        editModeHandler={props.updateEditModeState}
        item={props.vmgo.vision}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  } else {
    return (
      <VisionItem
        item={props.vmgo.vision}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Vision;
