import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import profile from "../../../assets/Image/Qw.png";
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

  console.log(props.trainingData)
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
      <div className="print-data">
        <center>
          <h1>PERSONAL DATA</h1>
        </center>
        <div className="profile-image">
          <div class="image">
            <img
              src={
                props.userData.profilePic !== ""
                  ? `http://localhost:5000/${props.userData.profilePic}`
                  : profile
              }
              alt="profile-pic"
            />
          </div>
        </div>
        <table cellPadding={3}>
          <tr>
            <th colSpan={8}>I. Personal Information</th>
          </tr>
          <tr>
            <td rowSpan={3} className="print-label">Surname
            <br></br>
              <br></br>
              First Name
              <br></br>
              <br></br>
              Middle Name
            </td>
            <td colSpan={7}>{props.userData.lastName ? props.userData.lastName : "N/A"}</td>
          </tr>
          <tr>
            <td colSpan={4}>{props.userData.firstName}</td>
            <td colSpan={2} className="print-label">Extension Name</td>
            <td>
              {props.userData.extensionName > 0
                ? props.userData.extensionName?.map((extension) => (
                    <span> {extension.extensionName} </span>
                  ))
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              {props.userData.middleName ? props.userData.middleName : "N/A"}
            </td>
            <td colSpan={2} className="print-label">Suffix Name</td>
            <td>
              {props.userData.suffixName ? props.userData.suffixName : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="print-label">Date of Birth</td>
            <td colSpan={2} >
              {props.userData.birthday
                ? formatDate(props.userData.birthday.substring(0, 10))
                : "N/A"}
            </td>
            <td className="print-label">Place of Birth</td>
            <td colSpan={2}>
              {props.userData.placeofBirth
                ? props.userData.placeofBirth
                : "N/A"}
            </td>
            <td className="print-label">Sex</td>
            <td>{props.userData.gender ? props.userData.gender : "N/A"}</td>
          </tr>
          <tr>
            <td className="print-label">Civil Status</td>
            <td colSpan={2}>
              {props.userData.civilStatus ? props.userData.civilStatus : "N/A"}
            </td>

            <td rowSpan={3} className ="print-label">Residential Address</td>
            <td colSpan={4} rowSpan ={3}>
              <table cellPadding={0} cellSpacing = {0} className="address-table">
                <tr>
                  <td className="print-label">House no.:</td>
                  <td>{props.userData.houseNoR ? props.userData.houseNoR : "N/A"}</td>
                  <td className="print-label">Street:</td>
                  <td>{props.userData.streetR ? props.userData.streetR : "N/A"}</td>
                </tr>
                <tr>
                <td className="print-label">Subdivision:</td>
                  <td>{props.userData.locationTypeR
                ? props.userData.locationTypeR
                : "N/A"}</td>
                  <td className="print-label">Barangay:</td>
                  <td>{barangayNameR ? barangayNameR : "N/A"}</td>
                </tr>
                <tr>
                  <td className="print-label">City:</td>
                  <td>{cityNameR ? cityNameR : "N/A"}</td>
                  <td className="print-label">Province:</td>
                  <td>{provinceNameR ? provinceNameR : "N/A"}</td>
                </tr>
                <tr>
                  <td className="print-label">Zip Code:</td>
                  <td>{props.userData.zipR ? props.userData.zipR : "N/A"}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td className="print-label">Height</td>
            <td colSpan={2}>
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
            <td className="print-label" >Weight</td>
            <td colSpan={2}>
              {props.userData.weight ? props.userData.weight + "kg" : "N/A"}
            </td>
          </tr>
          <tr>
            <td className ="print-label">Blodtype</td>
            <td colSpan={2}>
              {props.userData.bloodType ? props.userData.bloodType : "N/A"}
            </td>
            <td rowSpan={4} className ="print-label">Pemanent Address</td>
            <td colSpan={4} rowSpan ={4}>
            <table cellPadding={0} cellSpacing = {0} className="address-table">
                <tr>
                  <td className="print-label">House no.:</td>
                  <td>{props.userData.houseNoP ? props.userData.houseNoP : "N/A"}</td>
                  <td className="print-label">Street:</td>
                  <td>{props.userData.streetP ? props.userData.streetP : "N/A"}</td>
                </tr>
                <tr>
                <td className="print-label">Subdivision:</td>
                  <td>{props.userData.locationTypeP
                ? props.userData.locationTypeP
                : "N/A"}</td>
                  <td className="print-label">Barangay:</td>
                  <td>{barangayNameP ? barangayNameP : "N/A"}</td>
                </tr>
                <tr>
                  <td className="print-label">City:</td>
                  <td>{cityNameP ? cityNameP : "N/A"}</td>
                  <td className="print-label">Province:</td>
                  <td>{provinceNameP ? provinceNameP : "N/A"}</td>
                </tr>
                <tr>
                  <td className="print-label">Zip Code:</td>
                  <td>{props.userData.zipP ? props.userData.zipP : "N/A"}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td className ="print-label">GSS ID</td>
            <td colSpan={2}>{props.userData.gssId ? props.userData.gssId : "N/A"}</td>
          </tr>
          <tr>
            <td className ="print-label">PAGIBIG ID</td>
            <td colSpan={2}>
              {props.userData.pagibigId ? props.userData.pagibigId : "N/A"}
            </td>
          </tr>
          <tr>
            <td className ="print-label" >PHILHEALTH</td>
            <td colSpan={2}>
              {props.userData.philHealthId
                ? props.userData.philHealthId
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td className ="print-label">SSS NO</td>
            <td colSpan={2}>{props.userData.sssNo ? props.userData.sssNo : "N/A"}</td>
            <td className ="print-label">Telephone no.</td>
            <td colSpan={4}> {props.userData.telephoneNum ? props.userData.telephoneNum : "N/A"}</td>
          </tr>
          <tr>
            <td className ="print-label">TIN NO</td>
            <td colSpan={2}>{props.userData.tinNo ? props.userData.tinNo : "N/A"}</td>
            <td className ="print-label">Cellphone no.</td>
            <td colSpan={4}>{props.userData.cellphoneNum ? props.userData.cellphoneNum : "N/A"}</td>
          </tr>
          <tr>
            <td className ="print-label">Citizenship</td>
            <td colSpan={2}>
              {props.userData.citizenship ? props.userData.citizenship : "N/A"}
            </td>
            <td className ="print-label">Alternate Email</td>
            <td colSpan={4}>{props.userData.alternateEmail ? props.userData.alternateEmail : "N/A"}</td>
          </tr>
          <tr>
            <th colSpan={8}>II. Educational Background</th>
          </tr>
          <tr>
            <td className ="print-label">Level</td>
            <td className ="print-label">Name of School</td>
            <td className ="print-label">Degree</td>
            <td className ="print-label">From</td>
            <td className ="print-label">To</td>
            <td className ="print-label">Highest Level/ Units Earned:</td>
            <td className ="print-label">Year Graduated</td>
            <td className ="print-label">Scholarship/Academic Honors</td>
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
            <th colSpan={8}>III. Civil Service Eligibility</th>
          </tr>
          <tr className ="print-label" >
            <td>Career</td>
            <td>Rating</td>
            <td>Date of Examination</td>
            <td>Place of Examination</td>
            <td>License No.</td>
            <td colSpan={3}>Date of Validity</td>
          </tr>
          {props.civilServiceData?.length > 0 ? (
            props.civilServiceData?.map((item) => (
              <tr>
                <td>{item.career}</td>
                <td>{item.rating ? item.rating : "N/A"}</td>
                <td>{formatDate(item.date.substring(0, 10))}</td>
                <td>{item.placeOfExam}</td>
                <td>{item.licenseNumber ? item.licenseNumber : "N/A"}</td>
                <td colSpan={3}>
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
              <td colSpan={3}>N/A</td>
            </tr>
          )}
          <tr>
            <th colSpan={8}>IV. Work Experience</th>
          </tr>
          <tr className ="print-label">
            <td >From</td>
            <td>To</td>
            <td>Position Title</td>
            <td>Department/Agency/Office/Company</td>
            <td>Monthly Salary</td>
            <td>Salary Grade/Salary Step</td>
            <td colSpan={2}>Gov't Service</td>
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
                <td colSpan={2}>{item.government}</td>
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
              <td colSpan={2}>N/A</td>
            </tr>
          )}
          <tr>
            <th colSpan={8}>
              V. LEARNING AND DEVELOPMENT (L{"&"}D) INTERVENTIONS/TRAINING
              PROGRAMS ATTENDED
            </th>
          </tr>
          <tr className ="print-label">
            <td>Title of Learning and Development</td>
            <td>From</td>
            <td>To</td>
            <td>Number of Hours</td>
            <td>Type of LD</td>
            <td colSpan={3}>Conducted/Sponsored By</td>
          </tr>
          {props.trainingData.length > 0 ? (
            props.trainingData?.map((item) => (
              <tr>
                <td>{item.title}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.hours}</td>
                <td>{item.typeOfLearning}</td>
                <td colSpan={3}>{item.conducted}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td colSpan={3}>N/A</td>
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
      <button onClick={handlePrint} className = "print-button">Print</button>
      <ComponentToPrint data={activeAccountData()} ref={componentRef} />
    </div>
  );
};

export default PrintData;
