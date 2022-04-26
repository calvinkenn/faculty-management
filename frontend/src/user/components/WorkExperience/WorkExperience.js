import React from "react";
import WorkExperienceEdit from "./WorkExperienceEdit";

import WorkExperienceList from "./WorkExperienceList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    company: "TEST TITLE 1",
    position: "TEST TYPE 1",
    department: "TEST TYPE 1",
    from: "2020 1",
    to: "2021 1",
    salary: "22222",
    status: "RETIRED",
    governmentService: "NO",
  },
  {
    company: "TEST TITLE 2",
    position: "TEST TYPE 2",
    department: "TEST TYPE 1",
    from: "2020 2",
    to: "2021 2",
    salary: "22222",
    status: "RETIRED",
    governmentService: "NO",
  },
];

const WorkExperience = (props) => {
  const editModeHandler = () => {
    props.updateEditModeState(true);
  };

  if (props.isAddMode) {
    return (
      <WorkExperienceEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
      />
    );
  } else if (props.isEditMode) {
    return <WorkExperienceEdit addingItem={false} />;
  } else {
    return (
      <WorkExperienceList
        setIsEditModeHandler={editModeHandler}
        items={DUMMY_DATA}
      />
    );
  }
};

export default WorkExperience;
