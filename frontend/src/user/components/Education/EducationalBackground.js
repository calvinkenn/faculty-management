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
  const [userData, setUserData] = useState([]);
  const editModeHandler = () => {
    props.updateEditModeState(true);
  };


  //to get education
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/users/getUserEducation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      });
      const responseData = await response.json();
      setUserData(responseData.userEducation);
    };
    sendRequest();
  }, []);
  if (props.isAddMode) {
    return <EducationalEdit addingItem={true} updateAddModeState = {props.updateAddModeState} setUserData = {setUserData} />;
  } else if (props.isEditMode) {
    return <EducationalEdit addingItem={false} />;
  } else {
    return (
      <EducationalList
        items={DUMMY_DATA}
        setIsEditModeHandler={editModeHandler}
        userData = {userData}
        setUserData = {setUserData}
      />
    );
  }
};

export default EducationalBackground;
