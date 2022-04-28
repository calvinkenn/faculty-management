import React, { useState, useEffect } from "react";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

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
  const [userData, setUserData] = useState([]);
  const [success, setSuccess] = useState();
  const [editData, setEditData] = useState();

  const clearSuccess = () => {
    setSuccess(null);
  }
  const setAddedData = (userData, success) =>{
    setUserData(userData);
    setSuccess(success);
  }
  const setId = (editData) => {
    setEditData(editData)
  }

  const editModeHandler = (editData) => {
    props.updateEditModeState(true);
    setId(editData);
  };
  //to get list of civil services

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/users/getUserCivil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      });
      const responseData = await response.json();
      setUserData(responseData.userCivil);
    };
    sendRequest();
  }, [props.isAddMode, props.isEditMode]);
  if (props.isAddMode) {
    return (
      <CivilServiceEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData = {setAddedData}
      />
    );
  } else if (props.isEditMode) {
    return <CivilServiceEdit addingItem={false} editData ={editData} updateAddModeState = {props.updateEditModeState} setUserData = {setAddedData} />;
  } else {
    return (
      <React.Fragment>
      <SuccessModal success = {success} onClear = {clearSuccess}/>
      <CivilServiceList
        setIsEditModeHandler={editModeHandler}
        items={userData}
        setUserData = {setAddedData}
      />
      </React.Fragment>
    );
  }
};

export default CivilService;
