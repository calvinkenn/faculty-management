import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import "./PrintData.css";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>{this.props.data}</div>;
  }
}

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const formatHeight = (height) => {
  let formattedHeight = height.replace(/\./g, "ft ");
  return formattedHeight;
};

const PrintData = (props) => {
  const componentRef = useRef();
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

    provinces(props.userData.regionR).then((response) => {
      setProvinceR(response);
      setCityR([]);
      setBarangayR([]);
    });

    cities(props.userData.provinceR).then((response) => {
      setCityR(response);
    });

    barangays(props.userData.cityR).then((response) => {
      setBarangayR(response);
    });
    //Permanent
    provinces(props.userData.regionP).then((response) => {
      setProvinceP(response);
      setCityP([]);
      setBarangayP([]);
    });

    cities(props.userData.provinceP).then((response) => {
      setCityP(response);
    });

    barangays(props.userData.cityP).then((response) => {
      setBarangayP(response);
    });
  }, []);

  let regionNameR;
  regionDataR.map((item) => {
    if (item.region_code === props.userData.regionR) {
      regionNameR = item.region_name;
      return;
    }
  });

  let provinceNameR;
  provinceDataR.map((item) => {
    if (item.province_code === props.userData.provinceR) {
      provinceNameR = item.province_name;
      return;
    }
  });

  let cityNameR;
  cityDataR.map((item) => {
    if (item.city_code === props.userData.cityR) {
      cityNameR = item.city_name;
      return;
    }
  });

  let barangayNameR;
  barangayDataR.map((item) => {
    if (item.brgy_code === props.userData.barangayR) {
      barangayNameR = item.brgy_name;
      return;
    }
  });

  let regionNameP;
  regionDataP.map((item) => {
    if (item.region_code === props.userData.regionP) {
      regionNameP = item.region_name;
      return;
    }
  });

  let provinceNameP;
  provinceDataP.map((item) => {
    if (item.province_code === props.userData.provinceP) {
      provinceNameP = item.province_name;
      return;
    }
  });

  let cityNameP;
  cityDataP.map((item) => {
    if (item.city_code === props.userData.cityP) {
      cityNameP = item.city_name;
      return;
    }
  });

  let barangayNameP;
  barangayDataP.map((item) => {
    if (item.brgy_code === props.userData.barangayP) {
      barangayNameP = item.brgy_name;
      return;
    }
  });

  const activeAccountData = () => {
    return (
      <div>
        <center>
          <h1>PERSONAL DATA</h1>
        </center>
        <table>
          <tr>
            <th>I. Personal Information</th>
          </tr>
          <tr>
            <td>Surname</td>
            <td>{props.userData.lastName ? props.userData.lastName : "N/A"}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{props.userData.firstName}</td>
          </tr>
          <tr>
            <td>Middle Name</td>
            <td>
              {props.userData.middleName ? props.userData.middleName : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Suffix Name</td>
            <td>
              {props.userData.suffixName ? props.userData.suffixName : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Extension Name</td>
            <td>
              {props.userData.extensionName > 0
                ? props.userData.extensionName?.map((extension) => (
                    <span> {extension.extensionName} </span>
                  ))
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>
              {props.userData.birthday
                ? formatDate(props.userData.birthday.substring(0, 10))
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>{props.userData.gender ? props.userData.gender : "N/A"}</td>
          </tr>
          <tr>
            <td>Civil Status</td>
            <td>
              {props.userData.civilStatus ? props.userData.civilStatus : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              {props.userData.height
                ? formatHeight(props.userData.height)
                : "N/A"}{" "}
              {props.userData.height
                ? props.userData.height.indexOf(".") !== -1
                  ? "in"
                  : "ft"
                : ""}
            </td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>
              {props.userData.weight ? props.userData.weight + "kg" : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Blodtype</td>
            <td>
              {props.userData.bloodType ? props.userData.bloodType : "N/A"}
            </td>
          </tr>
          <tr>
            <td>GSS ID</td>
            <td>{props.userData.gssId ? props.userData.gssId : "N/A"}</td>
          </tr>
          <tr>
            <td>PAGIBIG ID</td>
            <td>
              {props.userData.pagibigId ? props.userData.pagibigId : "N/A"}
            </td>
          </tr>
          <tr>
            <td>PHILHEALTH</td>
            <td>
              {props.userData.philHealthId
                ? props.userData.philHealthId
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>SSS NO</td>
            <td>{props.userData.sssNo ? props.userData.sssNo : "N/A"}</td>
          </tr>
          <tr>
            <td>TIN NO</td>
            <td>{props.userData.tinNo ? props.userData.tinNo : "N/A"}</td>
          </tr>
          <tr>
            <td>Citizenship</td>
            <td>
              {props.userData.citizenship ? props.userData.citizenship : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Residential Address</td>
            <td>
              House no.:
              {props.userData.houseNoR ? props.userData.houseNoR : "N/A"}
              <br />
              Street:{props.userData.streetR ? props.userData.streetR : "N/A"}
              <br />
              Subdivision:
              {props.userData.locationTypeR
                ? props.userData.locationTypeR
                : "N/A"}
              <br />
              Region: {regionNameR ? regionNameR : "N/A"}
              <br />
              Province:{provinceNameR ? provinceNameR : "N/A"}
              <br />
              City: {cityNameR ? cityNameR : "N/A"}
              <br />
              Barangay: {barangayNameR ? barangayNameR : "N/A"}
              <br />
              Zip Code:{props.userData.zipR ? props.userData.zipR : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Permanent Address</td>
            <td>
              House no.:
              {props.userData.houseNoP ? props.userData.houseNoP : "N/A"}
              <br />
              Street:{props.userData.streetP ? props.userData.streetP : "N/A"}
              <br />
              Subdivision:
              {props.userData.locationTypeP
                ? props.userData.locationTypeP
                : "N/A"}
              <br />
              Region: {regionNameP ? regionNameP : "N/A"}
              <br />
              Province:{provinceNameP ? provinceNameP : "N/A"}
              <br />
              City: {cityNameP ? cityNameP : "N/A"}
              <br />
              Barangay: {barangayNameP ? barangayNameP : "N/A"}
              <br />
              Zip Code:{props.userData.zipP ? props.userData.zipP : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Telephone no.</td>
            <td> {props.telephoneNum ? props.telephoneNum : "N/A"}</td>
          </tr>
          <tr>
            <td>Cellphone no.</td>
            <td>{props.cellphoneNum ? props.cellphoneNum : "N/A"}</td>
          </tr>
          <tr>
            <td>Alternate Email</td>
            <td>{props.alternateEmail ? props.alternateEmail : "N/A"}</td>
          </tr>
          <tr>
            <th>II. Educational Background</th>
          </tr>
          <tr>
            <td>Level</td>
            <td>Name of School</td>
            <td>Degree</td>
            <td>From</td>
            <td>To</td>
            <td>Highest Level/ Units Earned:</td>
            <td>Year Graduated</td>
            <td>Scholarship/Academic Honors</td>
          </tr>
          {props.educationData?.length > 0 ? (
            props.educationData?.map((item) => (
              <tr>
                <td>{item.level}</td>
                <td>{item.school}</td>
                <td>{item.degree}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.highestLevel}</td>
                <td>{item.yearGraduated}</td>
                <td>
                  {item.awards.map((award) => (
                    <p>{award.awards}</p>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          )}
          <tr>
            <th>III. Civil Service Eligibility</th>
          </tr>
          <tr>
            <td>Career</td>
            <td>Rating</td>
            <td>Date of Examination</td>
            <td>Place of Examination</td>
            <td>License No.</td>
            <td>Date of Validity</td>
          </tr>
          {props.civilServiceData?.length > 0 ? (
            props.civilServiceData?.map((item) => (
              <tr>
                <td>{item.career}</td>
                <td>{item.rating ? item.rating : "N/A"}</td>
                <td>{formatDate(item.date.substring(0, 10))}</td>
                <td>{item.placeOfExam}</td>
                <td>{item.licenseNumber ? item.licenseNumber : "N/A"}</td>
                <td>
                  {item.licenseValidity
                    ? formatDate(item.licenseValidity.substring(0, 10))
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          )}
          <tr>
            <th>IV. Work Experience</th>
          </tr>
          <tr>
            <td>From</td>
            <td>To</td>
            <td>Position Title</td>
            <td>Department/Agency/Office/Company</td>
            <td>Monthly Salary</td>
            <td>Salary Grade/Salary Step</td>
            <td>Gov't Service</td>
          </tr>
          {props.workData?.length > 0 ? (
            props.workData?.map((item) => (
              <tr>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
                <td>&#8369;{item.monthlySalary}</td>
                <td>
                  {item.salaryGrade}-{item.salaryStep}
                </td>
                <td>{item.government}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          )}
          <tr>
            <th>
              V. LEARNING AND DEVELOPMENT (L{"&"}D) INTERVENTIONS/TRAINING
              PROGRAMS ATTENDED
            </th>
          </tr>
          <tr>
            <td>Title of Learning and Development</td>
            <td>From</td>
            <td>To</td>
            <td>Number of Hours</td>
            <td>Type of LD</td>
            <td>Conducted/Sponsored By</td>
          </tr>
          {props.trainingData > 0 ? (
            props.trainingData?.map((item) => (
              <tr>
                <td>{item.title}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.hours}</td>
                <td>{item.typeOfLearning}</td>
                <td>{item.conducted}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          )}
        </table>
      </div>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <ComponentToPrint data={activeAccountData()} ref={componentRef} />
    </div>
  );
};

export default PrintData;
