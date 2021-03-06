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

const formatDateLong = (date) => {
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const month1 = formatter.format(new Date(date));
  return month1;
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
  console.log(props.userData.birthDate);
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
        bday={
          props.userData.birthday
            ? formatDateLong(props.userData.birthday)
            : "N/A"
        }
        age={
          props.userData.birthday
            ? getAge(props.userData.birthday.substring(0, 10))
            : "N/A"
        }
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
