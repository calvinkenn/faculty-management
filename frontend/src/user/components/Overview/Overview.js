import React from "react";

import PrintData from "../PrintData/PrintData";
import OverviewItem from "./OverviewItem";

const BasicInfo = (props) => {
  if (props.isPrintMode) {
    return (
      <PrintData
        userData={props.userData}
        educationData={props.educationData}
        civilServiceData={props.civilServiceData}
        workData={props.workData}
        trainingData={props.trainingData}
      />
    );
  }
  return (
    <OverviewItem
      isEditMode={props.isEditMode}
      inOverview={props.inOverview}
      employeeNumber={props.userData.employeeNum}
      firstName={props.userData.firstName}
      middleName={props.userData.middleName}
      lastName={props.userData.lastName}
      email={props.userData.email}
      suffixName={props.userData.suffixName}
      extensionName={props.userData.extensionName}
      houseNo={props.userData.houseNoR}
      street={props.userData.streetR}
      locationType={props.userData.locationTypeR}
      region={props.userData.regionR}
      province={props.userData.provinceR}
      city={props.userData.cityR}
      barangay={props.userData.barangayR}
      zip={props.userData.zipR}
      telephoneNum={props.userData.telephoneNum}
      cellphoneNum={props.userData.cellphoneNum}
      alternateEmail={props.userData.alternateEmail}
    />
  );
};

export default BasicInfo;
