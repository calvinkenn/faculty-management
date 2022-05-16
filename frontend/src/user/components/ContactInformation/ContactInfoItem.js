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
            <table>
              <tr>
                <td className="label"><div>House no.</div></td>
                <td className="colon">:</td>
                <td>{props.residentHouseNo ? props.residentHouseNo : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Street</div></td>
                <td className="colon">:</td>
                <td>{props.residentStreet ? props.residentStreet : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Location Type</div></td>
                <td className="colon">:</td>
                <td>{props.residentLocationType ? props.residentLocationType : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Region</div></td>
                <td className="colon">:</td>
                <td>{regionNameR ? regionNameR : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Province</div></td>
                <td className="colon">:</td>
                <td>{provinceNameR ? provinceNameR : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>City</div></td>
                <td className="colon">:</td>
                <td>{cityNameR ? cityNameR : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Barangay</div></td>
                <td className="colon">:</td>
                <td>{barangayNameR ? barangayNameR : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Zip Code</div></td>
                <td className="colon">:</td>
                <td>{props.residentZip ? props.residentZip : "N/A"}</td>
              </tr>
            </table>
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
            <table>
              <tr>
                <td className="label"><div>House no.</div></td>
                <td className="colon">:</td>
                <td>{" "}{props.permanentHouseNo ? props.permanentHouseNo : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Street</div></td>
                <td className="colon">:</td>
                <td>{props.permanentStreet ? props.permanentStreet : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Location Type</div></td>
                <td className="colon">:</td>
                <td>{" "}{props.permanentLocationType ? props.permanentLocationType : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Region</div></td>
                <td className="colon">:</td>
                <td>{regionNameP ? regionNameP : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Province</div></td>
                <td className="colon">:</td>
                <td>{provinceNameP ? provinceNameP : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>City</div></td>
                <td className="colon">:</td>
                <td>{cityNameP ? cityNameP : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Barangay</div></td>
                <td className="colon">:</td>
                <td>{barangayNameP ? barangayNameP : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Zip Code</div></td>
                <td className="colon">:</td>
                <td>{props.permanentZip ? props.permanentZip : "N/A"}</td>
              </tr>
            </table>
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
            <table>
              <tr>
                <td className="label"><div>Telephone no.</div></td>
                <td className="colon">:</td>
                <td>{props.telephoneNum ? props.telephoneNum : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Cellphone no.</div></td>
                <td className="colon">:</td>
                <td>{props.cellphoneNum ? props.cellphoneNum : "N/A"}</td>
              </tr>
              <tr>
                <td className="label"><div>Alternate Email</div></td>
                <td className="colon">:</td>
                <td>{" "}{props.alternateEmail ? props.alternateEmail : "N/A"}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoItem;
