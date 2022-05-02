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
            <div>Middle Name: {props.middleName}</div>
            <div>Last Name: {props.lastName}</div>
            <div>Suffix Name:{props.suffixName}</div>
            <div>
                Extension Name:
                {props.extensionName?.map((extension) => (
                  <span> {extension.extensionName} </span>
                ))}
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
            <div>Birthday:{props.bday}</div>
            <div>Age:{props.age} years old</div>
            <div>Place of Birth:{props.placeofBirth}</div>
            <div>Citizenship:{props.citizenship}</div>
            <div>Gender:{props.gender}</div>
            <div>Civil Status:{props.civilStatus}</div>
            <div>
              Height:{formatHeight(props.height)}{" "}
              {props.height.indexOf(".") !== -1 ? "in" : "ft"}
            </div>
            <div>Weight:{props.weight} kg</div>
            <div>Bloodtype:{props.bloodType}</div>
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
            <div>GSS ID:{props.gssId}</div>
            <div>PAGIBIG ID:{props.pagibigId}</div>
            <div>PHILHEALTH:{props.philHealthId}</div>
            <div>SSS NO:{props.sssNo}</div>
            <div>TIN NO:{props.tinNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoItem;
