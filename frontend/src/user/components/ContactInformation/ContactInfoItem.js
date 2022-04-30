import React, { useState, useEffect } from "react";

import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import "./ContactInfoItem.css";

const ContactInfoItem = (props) => {
  const [regionDataR, setRegionR] = useState([]);
  const [provinceDataR, setProvinceR] = useState([]);
  const [cityDataR, setCityR] = useState([]);
  const [barangayDataR, setBarangayR] = useState([]);

  const [regionDataP, setRegionP] = useState([]);
  const [provinceDataP, setProvinceP] = useState([]);
  const [cityDataP, setCityP] = useState([]);
  const [barangayDataP, setBarangayP] = useState([]);

  const regionR = () => {
    regions().then((response) => {
      setRegionR(response);
    });
  };

  const regionP = () => {
    regions().then((response) => {
      setRegionP(response);
    });
  };

  useEffect(() => {
    regionR();
    regionP();

    provinces(props.residentRegion).then((response) => {
      setProvinceR(response);
      setCityR([]);
      setBarangayR([]);
    });

    cities(props.residentProvince).then((response) => {
      setCityR(response);
    });

    barangays(props.residentCity).then((response) => {
      setBarangayR(response);
    });
    //Permanent
    provinces(props.permanentRegion).then((response) => {
      setProvinceP(response);
      setCityP([]);
      setBarangayP([]);
    });

    cities(props.permanentProvince).then((response) => {
      setCityP(response);
    });

    barangays(props.permanentCity).then((response) => {
      setBarangayP(response);
    });
  }, []);

  let regionNameR = regionDataR.map((item) => {
    if (item.region_code === props.residentRegion) {
      return item.region_name;
    }
  });

  let provinceNameR = provinceDataR.map((item) => {
    if (item.province_code === props.residentProvince) {
      return item.province_name;
    }
  });

  let cityNameR = cityDataR.map((item) => {
    if (item.city_code === props.residentCity) {
      return item.city_name;
    }
  });

  let barangayNameR = barangayDataR.map((item) => {
    if (item.brgy_code === props.residentBarangay) {
      return item.brgy_name;
    }
  });

  let regionNameP = regionDataP.map((item) => {
    if (item.region_code === props.permanentRegion) {
      return item.region_name;
    }
  });

  let provinceNameP = provinceDataP.map((item) => {
    if (item.province_code === props.permanentProvince) {
      return item.province_name;
    }
  });

  let cityNameP = cityDataP.map((item) => {
    if (item.city_code === props.permanentCity) {
      return item.city_name;
    }
  });

  let barangayNameP = barangayDataP.map((item) => {
    if (item.brgy_code === props.permanentBarangay) {
      return item.brgy_name;
    }
  });

  return (
    <div className="contact-container">
      <div className="contact-container__data">
        <div>
          Resident Address
          <hr />
          <div>House no.:{props.residentHouseNo}</div>
          <div>Street:{props.residentStreet}</div>
          <div>Subdivision:{props.residentLocationType}</div>
          <div>Region: {regionNameR}</div>
          <div>Province:{provinceNameR}</div>
          <div>City: {cityNameR}</div>
          <div>Barangay: {barangayNameR}</div>
          <div>Zip Code:{props.residentZip}</div>
          <hr />
        </div>
        <div>
          Permanent Address
          <hr />
          <div>House no.:{props.permanentHouseNo}</div>
          <div>Street:{props.permanentStreet}</div>
          <div>Subdivision:{props.permanentLocationType}</div>
          <div>Region: {regionNameP}</div>
          <div>Province:{provinceNameP}</div>
          <div>City: {cityNameP}</div>
          <div>Barangay: {barangayNameP}</div>
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
