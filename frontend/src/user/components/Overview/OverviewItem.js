import React, { useState, useEffect } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import Button from "../../../shared/components/FormElements/Button";
import "./OverviewItem.css";

const OverviewItem = (props) => {
  const [regionDataR, setRegionR] = useState([]);
  const [provinceDataR, setProvinceR] = useState([]);
  const [cityDataR, setCityR] = useState([]);
  const [barangayDataR, setBarangayR] = useState([]);

  const regionR = () => {
    regions().then((response) => {
      setRegionR(response);
    });
  };

  useEffect(() => {
    regionR();

    provinces(props.region).then((response) => {
      setProvinceR(response);
      setCityR([]);
      setBarangayR([]);
    });

    cities(props.province).then((response) => {
      setCityR(response);
    });

    barangays(props.city).then((response) => {
      setBarangayR(response);
    });
  }, []);

  let regionNameR;
  regionDataR.map((item) => {
    if (item.region_code === props.region) {
      regionNameR = item.region_name;
      return;
    }
  });

  let provinceNameR;
  provinceDataR.map((item) => {
    if (item.province_code === props.province) {
      provinceNameR = item.province_name;
      return;
    }
  });

  let cityNameR;
  cityDataR.map((item) => {
    if (item.city_code === props.city) {
      cityNameR = item.city_name;
      return;
    }
  });

  let barangayNameR;
  barangayDataR.map((item) => {
    if (item.brgy_code === props.barangay) {
      barangayNameR = item.brgy_name;
      return;
    }
  });

  return (
    <div className="basic-container">
      <div className="basic-container__data">
        <div className="basic-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Basic Information</h1>
            </div>
          </div>
          <div>Employee Number: {props.employeeNumber}</div>
          <div>First Name: {props.firstName}</div>
          <div>Middle Name: {props.middleName ? props.middleName : "N/A"}</div>
          <div>Last Name: {props.lastName}</div>
          <div>Suffix Name: {props.suffixName ? props.suffixName : "N/A"}</div>
          <div>
            Extension Name:{" "}
            {props.extensionName > 0
              ? props.extensionName?.map((extension) => (
                  <span> {extension.extensionName} </span>
                ))
              : " N/A"}
          </div>
          <div>Email: {props.email}</div>
        </div>

        <div className="address-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Resident Address</h1>
            </div>
          </div>
          <div>House no.: {props.houseNo ? props.houseNo : "N/A"}</div>
          <div>Street: {props.street ? props.street : "N/A"}</div>
          <div>Type:{props.locationType ? props.locationType : "N/A"}</div>
          <div>Region: {regionNameR ? regionNameR : "N/A"}</div>
          <div>Province:{provinceNameR ? provinceNameR : "N/A"}</div>
          <div>City: {cityNameR ? cityNameR : "N/A"}</div>
          <div>Barangay: {barangayNameR ? barangayNameR : "N/A"}</div>
          <div>Zip Code: {props.zip ? props.zip : "N/A"}</div>
        </div>

        <div className="contact-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Contact Information</h1>
            </div>
          </div>
          <div>
            Telephone no.: {props.telephoneNum ? props.telephoneNum : "N/A"}
          </div>
          <div>
            Cellphone no.: {props.cellphoneNum ? props.cellphoneNum : "N/A"}
          </div>
          <div>
            Alternate Email:{" "}
            {props.alternateEmail ? props.alternateEmail : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
