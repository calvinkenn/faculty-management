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

  let regionNameR = regionDataR.map((item) => {
    if (item.region_code === props.region) {
      return item.region_name;
    }
  });

  let provinceNameR = provinceDataR.map((item) => {
    if (item.province_code === props.province) {
      return item.province_name;
    }
  });

  let cityNameR = cityDataR.map((item) => {
    if (item.city_code === props.city) {
      return item.city_name;
    }
  });

  let barangayNameR = barangayDataR.map((item) => {
    if (item.brgy_code === props.barangay) {
      return item.brgy_name;
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
          <div>Middle Name: {props.middleName}</div>
          <div>Last Name: {props.lastName}</div>
          <div>Suffix Name: {props.suffixName}</div>
          <div>
            Extension Name:
            {props.extensionName?.map((extension) => (
              <span> {extension.extensionName} </span>
            ))}
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
          <div>House no.:{props.houseNo}</div>
          <div>Street:{props.street}</div>
          <div>
            Type:{props.locationType === "1" ? "Subdivision" : "Village"}
          </div>
          <div>Region: {regionNameR}</div>
          <div>Province:{provinceNameR}</div>
          <div>City: {cityNameR}</div>
          <div>Barangay: {barangayNameR}</div>
          <div>Zip Code:{props.zip}</div>
        </div>

        <div className="contact-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Contact Information</h1>
            </div>
          </div>
          <div>Telephone no.:{props.telephoneNum}</div>
          <div>Cellphone no.:{props.cellphoneNum}</div>
          <div>Alternate Email:{props.alternateEmail}</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
