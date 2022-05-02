import React, { useState, useEffect } from "react";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

import CivilServiceEdit from "./CivilServiceEdit";
import CivilServiceList from "./CivilServiceList";

const CivilService = (props) => {
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
      <CivilServiceEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <CivilServiceEdit
        addingItem={false}
        editData={editData}
        // updateAddModeState={props.updateEditModeState}
        setUserData={props.userUpdate}
      />
    );
  } else {
    return (
      <React.Fragment>
        {/* <SuccessModal success={success} onClear={clearSuccess} /> */}
        <CivilServiceList
          setIsEditModeHandler={editModeHandler}
          items={props.civilServiceData}
          setUserData={props.userUpdate}
        />
      </React.Fragment>
    );
  }
};

export default CivilService;
