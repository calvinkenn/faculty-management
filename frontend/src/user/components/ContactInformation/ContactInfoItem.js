import React, { useState, useEffect } from "react";

import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import "./ContactInfoItem.css";

//Mikko is here
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
//end

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

  let regionNameR;
  regionDataR.map((item) => {
    if (item.region_code === props.residentRegion) {
      regionNameR = item.region_name;
      return;
    }
  });

  let provinceNameR;
  provinceDataR.map((item) => {
    if (item.province_code === props.residentProvince) {
      provinceNameR = item.province_name;
      return;
    }
  });

  let cityNameR;
  cityDataR.map((item) => {
    if (item.city_code === props.residentCity) {
      cityNameR = item.city_name;
      return;
    }
  });

  let barangayNameR;
  barangayDataR.map((item) => {
    if (item.brgy_code === props.residentBarangay) {
      barangayNameR = item.brgy_name;
      return;
    }
  });

  let regionNameP;
  regionDataP.map((item) => {
    if (item.region_code === props.permanentRegion) {
      regionNameP = item.region_name;
      return;
    }
  });

  let provinceNameP;
  provinceDataP.map((item) => {
    if (item.province_code === props.permanentProvince) {
      provinceNameP = item.province_name;
      return;
    }
  });

  let cityNameP;
  cityDataP.map((item) => {
    if (item.city_code === props.permanentCity) {
      cityNameP = item.city_name;
      return;
    }
  });

  let barangayNameP;
  barangayDataP.map((item) => {
    if (item.brgy_code === props.permanentBarangay) {
      barangayNameP = item.brgy_name;
      return;
    }
  });

  return (
    <div className="contact-container">
      <div className="contact-container__data">
        <div className="resident-add-cont">
          <div className="resident-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <OtherHousesIcon sx={{fontSize: "30px"}}/><h1 className="Marginlang">Resident Address</h1>
            </div>
          </div>
          <div className="resident-add-details-cont">
            <div>
              House no.: {props.residentHouseNo ? props.residentHouseNo : "N/A"}
            </div>
            <div>
              Street: {props.residentStreet ? props.residentStreet : "N/A"}
            </div>
            <div>
              Location Type:
              {props.residentLocationType ? props.residentLocationType : "N/A"}
            </div>
            <div>Region: {regionNameR ? regionNameR : "N/A"}</div>
            <div>Province: {provinceNameR ? provinceNameR : "N/A"}</div>
            <div>City: {cityNameR ? cityNameR : "N/A"}</div>
            <div>Barangay: {barangayNameR ? barangayNameR : "N/A"}</div>
            <div>Zip Code: {props.residentZip ? props.residentZip : "N/A"}</div>
          </div>
        </div>
        <div className="perma-add-cont">
          <div className="perma-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <HomeIcon sx={{fontSize: "30px"}}/><h1 className="Marginlang">Permanent Address</h1>
            </div>
          </div>
          <div className="perma-details-cont">
            <div>
              House no.:{" "}
              {props.permanentHouseNo ? props.permanentHouseNo : "N/A"}
            </div>
            <div>
              Street: {props.permanentStreet ? props.permanentStreet : "N/A"}
            </div>
            <div>
              Location Type:{" "}
              {props.permanentLocationType
                ? props.permanentLocationType
                : "N/A"}
            </div>
            <div>Region: {regionNameP ? regionNameP : "N/A"}</div>
            <div>Province: {provinceNameP ? provinceNameP : "N/A"}</div>
            <div>City: {cityNameP ? cityNameP : "N/A"}</div>
            <div>Barangay: {barangayNameP ? barangayNameP : "N/A"}</div>
            <div>
              Zip Code: {props.permanentZip ? props.permanentZip : "N/A"}
            </div>
          </div>
        </div>
        <div className="contact-info-cont">
          <div className="contact-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <ContactPhoneIcon sx={{fontSize: "30px"}}/><h1 className="Marginlang">Contact Information</h1>
            </div>
          </div>
          <div className="contact-details-cont">
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
    </div>
  );
};

export default ContactInfoItem;
