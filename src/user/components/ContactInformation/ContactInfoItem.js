import React from "react";

import Button from "../../../shared/components/FormElements/Button";
import "./ContactInfoItem.css";

const ContactInfoItem = (props) => {
  return (
    <div className="contact-container">
      <div className="contact-container__data">
        <div>
          Resident Address
          <hr />
          <div>House no.:{props.residentHouseNo}</div>
          <div>Street:{props.residentStreet}</div>
          <div>
            Type:{props.residentLocationType == "1" ? "Subdivision" : "Village"}
          </div>
          <div>Barangay: {props.residentBarangay}</div>
          <div>Province:{props.residentProvince}</div>
          <div>Zip Code:{props.residentZip}</div>
          <hr />
        </div>
        <div>
          Permanent Address
          <hr />
          <div>House no.:{props.permanentHouseNo}</div>
          <div>Street:{props.permanentStreet}</div>
          <div>
            Type:{props.permanentLocationType == "1" ? "Subdivision" : "Village"}
          </div>
          <div>Barangay: {props.permanentBarangay}</div>
          <div>Province:{props.permanentProvince}</div>
          <div>Zip Code:{props.permanentZip}</div>
          <hr />
        </div>
        <div>Telephone no.:{props.telephoneNum}</div>
        <div>Cellphone no.:{props.cellphoneNum}</div>
        <div>Alternate Email:{props.alternateEmail}</div>
      </div>
    </div>
  );
};

export default ContactInfoItem;
