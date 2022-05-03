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

  let regionNameR = regionDataR.map((item) => {
    if (item.region_code === props.userData.regionR) {
      return item.region_name;
    }
  });

  let provinceNameR = provinceDataR.map((item) => {
    if (item.province_code === props.userData.provinceR) {
      return item.province_name;
    }
  });

  let cityNameR = cityDataR.map((item) => {
    if (item.city_code === props.userData.cityR) {
      return item.city_name;
    }
  });

  let barangayNameR = barangayDataR.map((item) => {
    if (item.brgy_code === props.userData.barangayR) {
      return item.brgy_name;
    }
  });

  let regionNameP = regionDataP.map((item) => {
    if (item.region_code === props.userData.regionP) {
      return item.region_name;
    }
  });

  let provinceNameP = provinceDataP.map((item) => {
    if (item.province_code === props.userData.provinceP) {
      return item.province_name;
    }
  });

  let cityNameP = cityDataP.map((item) => {
    if (item.city_code === props.userData.cityP) {
      return item.city_name;
    }
  });

  let barangayNameP = barangayDataP.map((item) => {
    if (item.brgy_code === props.userData.barangayP) {
      return item.brgy_name;
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
            <td>{props.userData.lastName}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{props.userData.firstName}</td>
          </tr>
          <tr>
            <td>Middle Name</td>
            <td>{props.userData.middleName}</td>
          </tr>
          <tr>
            <td>Suffix Name</td>
            <td>{props.userData.suffixName}</td>
          </tr>
          <tr>
            <td>Extension Name</td>
            <td>
              {props.userData.extensionName?.map((extension) => (
                <span> {extension.extensionName} </span>
              ))}
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{formatDate(props.userData.birthday.substring(0, 10))}</td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>{props.userData.gender}</td>
          </tr>
          <tr>
            <td>Civil Status</td>
            <td>{props.userData.civilStatus}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              {formatHeight(props.userData.height)}{" "}
              {props.userData.height.indexOf(".") !== -1 ? "in" : "ft"}
            </td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{props.userData.weight}</td>
          </tr>
          <tr>
            <td>Blodtype</td>
            <td>{props.userData.bloodType}</td>
          </tr>
          <tr>
            <td>GSS ID</td>
            <td>{props.userData.gssId}</td>
          </tr>
          <tr>
            <td>PAGIBIG ID</td>
            <td>{props.userData.pagibigId}</td>
          </tr>
          <tr>
            <td>PHILHEALTH</td>
            <td>{props.userData.philHealthId}</td>
          </tr>
          <tr>
            <td>SSS NO</td>
            <td>{props.userData.sssNo}</td>
          </tr>
          <tr>
            <td>TIN NO</td>
            <td>{props.userData.tinNo}</td>
          </tr>
          <tr>
            <td>Citizenship</td>
            <td>{props.userData.citizenship}</td>
          </tr>
          <tr>
            <td>Residential Address</td>
            <td>
              House no.:{props.userData.houseNoR}
              <br />
              Street:{props.userData.streetR}
              <br />
              Subdivision:{props.userData.locationTypeR}
              <br />
              Region: {regionNameR}
              <br />
              Province:{provinceNameR}
              <br />
              City: {cityNameR}
              <br />
              Barangay: {barangayNameR}
              <br />
              Zip Code:{props.userData.zipR}
            </td>
          </tr>
          <tr>
            <td>Permanent Address</td>
            <td>
              House no.:{props.userData.houseNoP}
              <br />
              Street:{props.userData.streetP}
              <br />
              Subdivision:{props.userData.locationTypeP}
              <br />
              Region: {regionNameP}
              <br />
              Province:{provinceNameP}
              <br />
              City: {cityNameP}
              <br />
              Barangay: {barangayNameP}
              <br />
              Zip Code:{props.userData.zipP}
            </td>
          </tr>
          <tr>
            <td>Telephone no.</td>
            <td>{props.userData.telephoneNum}</td>
          </tr>
          <tr>
            <td>Cellphone no.</td>
            <td>{props.userData.cellphoneNum}</td>
          </tr>
          <tr>
            <td>Alternate Email</td>
            <td>{props.userData.alternateEmail}</td>
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
          {props.educationData?.map((item) => (
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
          ))}
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
          {props.civilServiceData?.map((item) => (
            <tr>
              <td>{item.career}</td>
              <td>{item.rating}</td>
              <td>{formatDate(item.date.substring(0, 10))}</td>
              <td>{item.placeOfExam}</td>
              <td>{item.licenseNumber}</td>
              <td>{formatDate(item.licenseValidity.substring(0, 10))}</td>
            </tr>
          ))}
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
          {props.workData?.map((item) => (
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
          ))}
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
          {props.trainingData?.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.fromDate}</td>
              <td>{item.toDate}</td>
              <td>{item.hours}</td>
              <td>{item.typeOfLearning}</td>
              <td>{item.conducted}</td>
            </tr>
          ))}
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
