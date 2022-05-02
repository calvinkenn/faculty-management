import React from "react";
import BasicInfoEdit from "./BasicInfoEdit";

import BasicInfoItem from "./BasicInfoItem";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

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
    return (
      <BasicInfoEdit
        userEdit={props.userData}
        setEditMode={props.setEditMode}
      />
    );
  } else {
    return (
      <BasicInfoItem
        isEditMode={props.isEditMode}
        employeeNumber={props.userData.employeeNum}
        firstName={props.userData.firstName}
        middleName={props.userData.middleName}
        lastName={props.userData.lastName}
        email={props.userData.email}
        suffixName={props.userData.suffixName}
        extensionName={props.userData.extensionName}
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
