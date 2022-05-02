import React from "react";

import Button from "../../../shared/components/FormElements/Button";
import "./BasicInfoItem.css";

const formatHeight = (height) => {
  let formattedHeight = height.replace(/\./g, "ft ");
  return formattedHeight;
};

const BasicInfoItem = (props) => {
  return (
    <div className="basic-container">
      <div className="basic-container__data">
        <div>First Name: {props.firstName}</div>
        <div>Middle Name: {props.middleName}</div>
        <div>Last Name: {props.lastName}</div>
        <div>Email: {props.email}</div>
        <div>Suffix Name:{props.suffixName}</div>
        <div>
            Extension Name:
            {props.extensionName?.map((extension) => (
              <span> {extension.extensionName} </span>
            ))}
          </div>
        <div>Birthday:{props.bday}</div>
        <div>Age:{props.age} years old</div>
        <div>Place of Birth:{props.placeofBirth}</div>
        <div>Gender:{props.gender}</div>
        <div>Civil Status:{props.civilStatus}</div>
        <div>
          Height:{formatHeight(props.height)}{" "}
          {props.height.indexOf(".") !== -1 ? "in" : "ft"}
        </div>
        <div>Weight:{props.weight} kg</div>
        <div>Bloodtype:{props.bloodType}</div>
        <div>GSS ID:{props.gssId}</div>
        <div>PAGIBIG ID:{props.pagibigId}</div>
        <div>PHILHEALTH:{props.philHealthId}</div>
        <div>SSS NO:{props.sssNo}</div>
        <div>TIN NO:{props.tinNo}</div>
        <div>Citizenship:{props.citizenship}</div>
      </div>
    </div>
  );
};

export default BasicInfoItem;
