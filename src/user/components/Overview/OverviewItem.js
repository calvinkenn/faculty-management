import React from "react";

import Button from "../../../shared/components/FormElements/Button";
import "./OverviewItem.css";

const OverviewItem = (props) => {
  return (
    <div className="basic-container">
      <div className="basic-container__data">
        <div>Employee Number: {props.employeeNumber}</div>
        <div>First Name: {props.firstName}</div>
        <div>Middle Name: {props.middleName}</div>
        <div>Last Name: {props.lastName}</div>
        <div>Address: {props.address}</div>
        <div>Contact: {props.contact}</div>
        <div>Email: {props.email}</div>
        <div>Extension Name:{props.extensionName}</div>
        <div>
          Resident Address
          <hr />
          <div>House no.:{props.houseNo}</div>
          <div>Street:{props.street}</div>
          <div>
            Type:{props.locationType == "1" ? "Subdivision" : "Village"}
          </div>
          <div>Barangay: {props.barangay}</div>
          <div>Province:{props.province}</div>
          <div>Zip Code:{props.zip}</div>
        </div>
        <div>Telephone no.:{props.telephoneNum}</div>
        <div>Cellphone no.:{props.cellphoneNum}</div>
        <div>Alternate Email:{props.alternateEmail}</div>
      </div>
    </div>
  );
};

export default OverviewItem;
