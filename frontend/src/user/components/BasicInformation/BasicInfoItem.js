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
        <div className="basic-name-container">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Employee Name</h1>
            </div>
          </div>
          <div className="name-detail-cont">
            <div>First Name: {props.firstName}</div>
            <div>Middle Name: {props.middleName ? props.middleName : "N/A"}</div>
            <div>Last Name: {props.lastName}</div>
            <div>
              Suffix Name: {props.suffixName ? props.suffixName : "N/A"}
            </div>
            <div>
              Extension Name:
              {props.extensionName > 0
                ? props.extensionName?.map((extension) => (
                    <span> {extension.extensionName} </span>
                  ))
                : " N/A"}
            </div>
          </div>
        </div>
        {/* <div>Email: {props.email}</div> */}
        <div className="personal-info-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Personal Information</h1>
            </div>
          </div>
          <div className="personal-info-detail-cont">
            <div>Birthday: {props.bday ? props.bday : "N/A"}</div>
            <div>Age: {props.age > 0 ? props.age + " years old" : "N/A"}</div>
            <div>
              Place of Birth: {props.placeofBirth ? props.placeofBirth : "N/A"}
            </div>
            <div>
              Citizenship: {props.citizenship ? props.citizenship : "N/A"}
            </div>
            <div>Gender: {props.gender ? props.gender : "N/A"}</div>
            <div>
              Civil Status: {props.civilStatus ? props.civilStatus : "N/A"}
            </div>
            <div>
              Height: {props.height ? formatHeight(props.height) : "N/A"}
              {props.height !== ""
                ? props.height.indexOf(".") !== -1
                  ? "in"
                  : "ft"
                : ""}
            </div>
            <div>Weight: {props.weight ? props.weight + "kg" : "N/A"}</div>
            <div>Bloodtype: {props.bloodType ? props.bloodType : "N/A"}</div>
          </div>
        </div>
        <div className="government-id-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Government Issued ID</h1>
            </div>
          </div>
          <div className="gov-id-detail-cont">
            <div>GSS ID: {props.gssId ? props.gssId : "N/A"}</div>
            <div>PAGIBIG ID: {props.pagibigId ? props.pagibigId : "N/A"}</div>
            <div>
              PHILHEALTH: {props.philHealthId ? props.philHealthId : "N/A"}
            </div>
            <div>SSS NO: {props.sssNo ? props.sssNo : "N/A"}</div>
            <div>TIN NO: {props.tinNo ? props.tinNo : "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoItem;
