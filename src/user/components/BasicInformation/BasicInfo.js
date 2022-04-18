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

const BasicInfo = (props) => {
  if (props.isEditMode) {
    return <BasicInfoEdit />;
  } else {
    return (
      <BasicInfoItem
        isEditMode={props.isEditMode}
        inOverview={props.inOverview}
        employeeNumber={DUMMY_DATA.employeeNumber}
        firstName={DUMMY_DATA.firstName}
        middleName={DUMMY_DATA.middleName}
        lastName={DUMMY_DATA.lastName}
        contact={DUMMY_DATA.contact}
        email={DUMMY_DATA.email}
        extensionName={DUMMY_DATA.extensionName}
        bday={DUMMY_DATA.bday}
        age={DUMMY_DATA.age}
        placeOfBirth={DUMMY_DATA.placeOfBirth}
        gender={DUMMY_DATA.gender}
        civilStatus={DUMMY_DATA.civilStatus}
        height={DUMMY_DATA.height}
        weight={DUMMY_DATA.weight}
        bloodType={DUMMY_DATA.bloodType}
        gssID={DUMMY_DATA.gssID}
        pagibigID={DUMMY_DATA.pagibigID}
        philhealth={DUMMY_DATA.philhealth}
        sssNO={DUMMY_DATA.sssNO}
        tinNO={DUMMY_DATA.tinNO}
        citizenship={DUMMY_DATA.citizenship}
      />
    );
  }
};

export default BasicInfo;
