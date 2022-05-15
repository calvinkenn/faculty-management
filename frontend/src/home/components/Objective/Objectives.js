import React, { useState } from "react";

import "./Objectives.css";
import ObjectivesEdit from "./ObjectivesEdit";
import ObjectivesItem from "./ObjectivesItem";

const Objectives = (props) => {
  const [objEdit, setObjEdit] = useState(false);

  const editModeHandler = (obj) => {
    props.updateEditModeState();
    setObjEdit(obj);
  };

  if (props.isEditMode) {
    return (
      <ObjectivesEdit
        item_IT={props.vmgo.bsitObjectives}
        item_BLIS={props.vmgo.blisObjectives}
        editModeHandler={props.updateEditModeState}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
        bsitObj={objEdit}
      />
    );
  } else {
    return (
      <ObjectivesItem
        item_IT={props.vmgo.bsitObjectives}
        item_BLIS={props.vmgo.blisObjectives}
        editModeHandler={editModeHandler}
        id={props.vmgo._id}
        messageHandler={props.messageHandler}
      />
    );
  }
};

export default Objectives;
