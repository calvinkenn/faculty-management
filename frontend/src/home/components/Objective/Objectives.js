import React from "react";

import "./Objectives.css";
import ObjectivesEdit from "./ObjectivesEdit";
import ObjectivesItem from "./ObjectivesItem";

const Objectives = (props) => {
  if (props.isEditMode) {
    return (
      <ObjectivesEdit
        item_IT={props.vmgo.bsitObjectives}
        item_BLIS={props.vmgo.blisObjectives}
        editModeHandler={props.updateEditModeState}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  } else {
    return (
      <ObjectivesItem
        item_IT={props.vmgo.bsitObjectives}
        item_BLIS={props.vmgo.blisObjectives}
        editModeHandler={props.updateEditModeState}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  }
};

export default Objectives;
