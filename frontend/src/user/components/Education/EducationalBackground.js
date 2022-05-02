import React, { useState, useEffect } from "react";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

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
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState();
  const [success, setSuccess] = useState();

  const clearSuccess = () => {
    setSuccess(null);
  };

  const setId = (editData) => {
    setEditData(editData);
  };

  const editModeHandler = (editData) => {
    props.updateEditModeState(true);
    setId(editData);
  };

  const setAddedData = (userData, success) => {
    setUserData(userData);
    setSuccess(success);
  };

  if (props.isAddMode) {
    return (
      <EducationalEdit
        addingItem={true}
        // updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <EducationalEdit
        addingItem={false}
        editData={editData}
        // updateAddModeState={props.updateEditModeState}
        setUserData={props.userUpdate}
      />
    );
  } else {
    return (
      <React.Fragment>
        <EducationalList
          items={DUMMY_DATA}
          setIsEditModeHandler={editModeHandler}
          userData={props.educationData}
          setUserData={props.userUpdate}
        />
      </React.Fragment>
    );
  }
};

export default EducationalBackground;
