import React, { useState, useEffect } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import Button from "../../../shared/components/FormElements/Button";
import "./OverviewItem.css";

//mikko is here
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
//end

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
              <AccountCircleIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">Basic Information</h1>
            </div>
          </div>
          <table className="basic-info-table">
            <tr>
              <td className="label"><div>Employee Number</div></td>
              <td className="colon">:</td>
              <td>{props.employeeNumber}</td>
            </tr>
            <tr>
              <td className="label"><div>First Name</div></td>
              <td className="colon">:</td>
              <td>{props.firstName}</td>
            </tr>
            <tr>
              <td className="label"><div>Middle Name</div></td>
              <td className="colon">:</td>
              <td>{props.middleName ? props.middleName : "N/A"}</td>
            </tr>
            <tr>
              <td className="label"><div>Last Name</div></td>
              <td className="colon">:</td>
              <td>{props.lastName}</td>
            </tr>
            <tr>
              <td className="label"><div>Suffix Name</div></td>
              <td className="colon">:</td>
              <td> {props.suffixName ? props.suffixName : "N/A"}</td>
            </tr>
            <tr>
              <td className="label"><div>Extension Name{" "}</div></td>
              <td className="colon">:</td>
              <td>
                {props.extensionName?.length > 0
                  ? props.extensionName?.map((extension) => (
                    <span> {extension.extensionName} </span>
                  ))
                  : " N/A"
                }
              </td>
            </tr>
            <tr>
              <td className="label"><div>Email</div></td>
              <td className="colon">:</td>
              <td>{props.email}</td>
            </tr>
          </table>
        </div>

        <div className="address-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <OtherHousesIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">Resident Address</h1>
            </div>
          </div>
          <table className="basic-info-table">
            <tr>
              <td className="label"><div>House Number</div></td>
              <td className="colon">:</td>
              <td>{props.houseNo ? props.houseNo : "N/A"}</td>
            </tr>
            <tr>
              <td className="label"><div>Street</div></td>
              <td className="colon">:</td>
              <td>{props.street ? props.street : "N/A"}</td>
            </tr>
            <tr>
              <td className="label"><div>Type</div></td>
              <td className="colon">:</td>
              <td>{props.locationType ? props.locationType : "N/A"}</td>
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
              <td>{props.zip ? props.zip : "N/A"}</td>
            </tr>
          </table>
        </div>

        <div className="contact-info-cont">
          <div className="basic-info-title">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <ContactPhoneIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">Contact Information</h1>
            </div>
          </div>
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
          {/* <div>
            Telephone no.: {props.telephoneNum ? props.telephoneNum : "N/A"}
          </div>
          <div>
            Cellphone no.: {props.cellphoneNum ? props.cellphoneNum : "N/A"}
          </div>
          <div>
            Alternate Email:{" "}
            {props.alternateEmail ? props.alternateEmail : "N/A"}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
