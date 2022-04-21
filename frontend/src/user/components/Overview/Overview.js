import React from "react";

import OverviewItem from "./OverviewItem";

const DUMMY_DATA = {
  //REPLACE WITH DATABASE
  employeeNumber: "223111",
  firstName: "TEST TITLE 1",
  middleName: "TEST TYPE 1",
  lastName: "2020 1",
  contact: "23213111",
  email: "TEST EMAIL",
  extensionName: "TEST EXTENSION",
  residentAddress: {
    houseNo: "TEST",
    street: "TEST",
    locationType: "1",
    barangay: "TEST",
    city: "TEST",
    province: "TEST",
    zip: "TEST",
  },
  telephoneNum: "TEST",
  cellphoneNum: "TEST",
  alternateEmail: "TEST",
};

const BasicInfo = (props) => {
  return (
    <OverviewItem
      isEditMode={props.isEditMode}
      inOverview={props.inOverview}
      employeeNumber={props.userData.employeeNum}
      firstName={props.userData.firstName}
      middleName={DUMMY_DATA.middleName}
      lastName={props.userData.lastName}
      contact={DUMMY_DATA.contact}
      email={props.userData.email}
      extensionName={DUMMY_DATA.extensionName}
      houseNo={DUMMY_DATA.residentAddress.houseNo}
      street={DUMMY_DATA.residentAddress.street}
      locationType={DUMMY_DATA.residentAddress.locationType}
      barangay={DUMMY_DATA.residentAddress.barangay}
      province={DUMMY_DATA.residentAddress.province}
      zip={DUMMY_DATA.residentAddress.zip}
      telephoneNum={DUMMY_DATA.telephoneNum}
      cellphoneNum={DUMMY_DATA.cellphoneNum}
      alternateEmail={DUMMY_DATA.alternateEmail}
    />
  );
};

export default BasicInfo;
