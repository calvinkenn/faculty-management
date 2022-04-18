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
  const [isEditMode, setIsEditMode] = useState(false);

  if (props.isAddMode) {
    return <CivilServiceEdit isEditMode={isEditMode} />;
  } else {
    return <CivilServiceList items={DUMMY_DATA} />;
  }
};

export default CivilService;
