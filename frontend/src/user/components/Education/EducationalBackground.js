import React, { useState, useEffect } from "react";

import EducationalEdit from "./EducationalEdit";
import EducationalList from "./EducationalList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    level: "ELEMENTARY",
    schoolName: "TEST TITLE 1",
    degree: "TEST TYPE 1",
    from: "2020 1",
    to: "2020 1",
    yearGraduated: "2020 1",
    awards: ["Best in english", "Best in filipino"],
  },
  {
    level: "SECONDARY",
    schoolName: "TEST TITLE 1",
    degree: "TEST TYPE 1",
    from: "2020 1",
    to: "2020 1",
    yearGraduated: "2020 1",
    awards: ["Best in math", "Best in science"],
  },
  {
    level: "COLLEGE",
    schoolName: "TEST TITLE 1",
    degree: "TEST TYPE 1",
    from: "2020 1",
    to: "2020 1",
    yearGraduated: "2020 1",
    awards: ["Best in math", "Best in science"],
  },
];

const EducationalBackground = (props) => {
  const editModeHandler = () => {
    props.updateEditModeState(true);
  };

  if (props.isAddMode) {
    return <EducationalEdit addingItem={true} />;
  } else if (props.isEditMode) {
    return <EducationalEdit addingItem={false} />;
  } else {
    return (
      <EducationalList
        items={DUMMY_DATA}
        setIsEditModeHandler={editModeHandler}
      />
    );
  }
};

export default EducationalBackground;
