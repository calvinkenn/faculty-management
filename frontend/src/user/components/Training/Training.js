import React, {useEffect, useState} from "react";
import TrainingEdit from "./TrainingEdit";

import TrainingList from "./TrainingList";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

const Training = (props) => {
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

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/users/getUserTraining", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      });
      const responseData = await response.json();
      setUserData(responseData.userTraining);
    };
    sendRequest();
  }, [props.isAddMode, props.isEditMode]);

  if (props.isAddMode) {
    return (
      <TrainingEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData = {setAddedData}
      />
    );
  } else if (props.isEditMode) {
    return <TrainingEdit addingItem={false} editData ={editData} updateAddModeState = {props.updateEditModeState} setUserData = {setAddedData} />;
  } else {
    return (
      <React.Fragment>
        <SuccessModal success = {success} onClear = {clearSuccess}/>
        <TrainingList setIsEditModeHandler={editModeHandler} list={userData} setUserData = {setAddedData} />
      </React.Fragment>
    );
  }
};

export default Training;
