import React, { useEffect, useState } from "react";
import TrainingEdit from "./TrainingEdit";

import TrainingList from "./TrainingList";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

const Training = (props) => {
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
      <TrainingEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <TrainingEdit
        addingItem={false}
        editData={editData}
        // updateAddModeState={props.updateEditModeState}
        setUserData={props.userUpdate}
      />
    );
  } else {
    return (
      <React.Fragment>
        <TrainingList
          setIsEditModeHandler={editModeHandler}
          list={props.trainingData}
          setUserData={props.userUpdate}
        />
      </React.Fragment>
    );
  }
};

export default Training;
