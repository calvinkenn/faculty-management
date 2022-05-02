import React, { useState, useEffect } from "react";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";
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
    monthlySalary: "22222",
    salaryGrade: "01",
    salaryStep: "1",
    status: "RETIRED",
    governmentService: "NO",
  },
  {
    company: "TEST TITLE 2",
    position: "TEST TYPE 2",
    department: "TEST TYPE 1",
    from: "2020 2",
    to: "2021 2",
    monthlySalary: "22222",
    salaryGrade: "01",
    salaryStep: "1",
    status: "RETIRED",
    governmentService: "NO",
  },
];

const WorkExperience = (props) => {
  const [userData, setUserData] = useState([]);
  const [success, setSuccess] = useState();
  const [editData, setEditData] = useState();

  const clearSuccess = () => {
    setSuccess(null);
  };
  const setAddedData = (userData, success) => {
    setUserData(userData);
    setSuccess(success);
  };
  const setId = (editData) => {
    setEditData(editData);
  };
  const editModeHandler = (editData) => {
    props.updateEditModeState(true);
    setId(editData);
  };

  if (props.isAddMode) {
    return (
      <WorkExperienceEdit
        addingItem={true}
        // updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <WorkExperienceEdit
        addingItem={false}
        editData={editData}
        setUserData={props.userUpdate}
        // updateAddModeState={props.updateEditModeState}
      />
    );
  } else {
    return (
      <React.Fragment>
        <SuccessModal success={success} onClear={clearSuccess} />
        <WorkExperienceList
          setUserData={props.userUpdate}
          setIsEditModeHandler={editModeHandler}
          items={props.workData}
        />
      </React.Fragment>
    );
  }
};

export default WorkExperience;
