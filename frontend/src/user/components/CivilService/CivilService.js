import React, { useState } from "react";

import CivilServiceEdit from "./CivilServiceEdit";
import CivilServiceList from "./CivilServiceList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    career: "TEST TITLE 1",
    rating: "TEST TYPE 1",
    date: "2020 1",
    examPlace: "TEST",
    licenseNumber: "232",
    licenseValidity: "232",
  },
  {
    career: "TEST TITLE 2",
    rating: "TEST TYPE 2",
    date: "2020 2",
    examPlace: "TEST",
    licenseNumber: "232",
    licenseValidity: "232",
  },
];

const CivilService = (props) => {
  const editModeHandler = () => {
    props.updateEditModeState(true);
  };

  if (props.isAddMode) {
    return (
      <CivilServiceEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
      />
    );
  } else if (props.isEditMode) {
    return <CivilServiceEdit addingItem={false} />;
  } else {
    return (
      <CivilServiceList
        setIsEditModeHandler={editModeHandler}
        items={DUMMY_DATA}
      />
    );
  }
};

export default CivilService;
