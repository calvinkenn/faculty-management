import React from "react";
import BasicInfoEdit from "./BasicInfoEdit";

import BasicInfoItem from "./BasicInfoItem";

const DUMMY_DATA = {
  //REPLACE WITH DATABASE
  employeeNumber: "223111",
  firstName: "TEST TITLE 1",
  middleName: "TEST TYPE 1",
  lastName: "2020 1",
  contact: "23213111",
  email: "TEST EMAIL",
  extensionName: "TEST EXTENSION",
  bday: "2022",
  age: "12",
  placeOfBirth: "TEST PLACE",
  gender: "Male",
  civilStatus: "Single",
  height: "4.5",
  weight: "25",
  bloodType: "AB",
  gssID: "TEST",
  pagibigID: "TEST",
  philhealth: "TEST",
  sssNO: "TEST",
  tinNO: "TEST",
  citizenship: "TEST",
};

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
  year = datePart[0].substring(0, 4),
  month = datePart[1], day = datePart[2];

  return day+'/'+month+'/'+year;
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const BasicInfo = (props) => {
  if (props.isEditMode) {
    return (<BasicInfoEdit
      userEdit =  {props.userData}
      setEditMode = {props.setEditMode}/>);
  } else {
    return (
      <BasicInfoItem
        isEditMode={props.isEditMode}
        inOverview={props.inOverview}
        employeeNumber={props.userData.employeeNum}
        firstName={props.userData.firstName}
        middleName={props.userData.middleName}
        lastName={props.userData.lastName}
        contact={DUMMY_DATA.contact}
        email={props.userData.email}
        extensionName={DUMMY_DATA.extensionName}
        bday={formatDate(props.userData.birthday.substring(0, 10))}
        age={getAge(props.userData.birthday.substring(0, 10))}
        placeofBirth={props.userData.placeofBirth}
        gender={props.userData.gender}
        civilStatus={props.userData.civilStatus}
        height={props.userData.height}
        weight={props.userData.weight}
        bloodType={props.userData.bloodType}
        gssId={props.userData.gssId}
        pagibigId={props.userData.pagibigId}
        philHealthId={props.userData.philHealthId}
        sssNo={props.userData.sssNo}
        tinNo={props.userData.tinNo}
        citizenship={props.userData.citizenship}
      />
    );
  }
};

export default BasicInfo;
