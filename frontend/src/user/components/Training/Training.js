import React, {useEffect, useState} from "react";
import TrainingEdit from "./TrainingEdit";

import TrainingList from "./TrainingList";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    title: "TEST TITLE 1",
    type: "TEST TYPE 1",
    from: "2020 1",
    to: "2021 1",
    certificate:
      "https://templatelab.com/wp-content/uploads/2018/11/Certificateofcompletion-3-e1542503155589.jpg",
    hours: "5",
    typeOfLD: "Test",
    conducted: "Test",
  },
  {
    title: "TEST TITLE 2",
    type: "TEST TYPE 2",
    from: "2020 2",
    to: "2021 2",
    certificate:
      "https://templatelab.com/wp-content/uploads/2018/11/Certificateofcompletion-3-e1542503155589.jpg",
    hours: "5",
    typeOfLD: "Test",
    conducted: "Test",
  },
];

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
