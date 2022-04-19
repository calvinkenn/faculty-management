import React from "react";

import Button from "../../../shared/components/FormElements/Button";
import "./BasicInfoItem.css";

const BasicInfoItem = (props) => {
  return (
    <div className="basic-container">
      <div className="basic-container__data">
        <div>First Name: {props.firstName}</div>
        <div>Middle Name: {props.middleName}</div>
        <div>Last Name: {props.lastName}</div>
        <div>Contact: {props.contact}</div>
        <div>Email: {props.email}</div>
        <div>Extension Name:{props.extensionName}</div>
        <div>Birthday:{props.bday}</div>
        <div>Age:{props.age}</div>
        <div>Place of Birth:{props.placeOfBirth}</div>
        <div>Gender:{props.gender}</div>
        <div>Civil Status:{props.civilStatus}</div>
        <div>Height:{props.height}</div>
        <div>Weight:{props.weight}</div>
        <div>Bloodtype:{props.bloodType}</div>
        <div>GSS ID:{props.gssID}</div>
        <div>PAGIBIG ID:{props.pagibigID}</div>
        <div>PHILHEALTH:{props.philhealth}</div>
        <div>SSS NO:{props.sssNO}</div>
        <div>TIN NO:{props.tinNO}</div>
        <div>Citizenship:{props.citizenship}</div>
      </div>
    </div>
  );
};

export default BasicInfoItem;
