import React from "react";
import Button from "../../../shared/components/FormElements/Button";
import "./BasicInfoItem.css";

//mikko is here
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
//end

const formatHeight = (height) => {
  let formattedHeight = height.replace(/\./g, "ft ");
  return formattedHeight;
};

const formatID = (id) => {
  var index = id.lastIndexOf("-");
  var test = id.substr(index + 1);
  if (test.length === 4) id = id + "-";
};

const BasicInfoItem = (props) => {
  return (
    <div className="basic-container">
      <div className="basic-container__data">
        <div className="basic-name-container">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <AccountCircleIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Employee Name</h1>
            </div>
          </div>
          <div className="name-detail-cont">
            <table>
              <tr>
                <td className="label">
                  <div>First Name</div>
                </td>
                <td className="colon">:</td>
                <td>{props.firstName}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Middle Name</div>
                </td>
                <td className="colon">:</td>
                <td>{props.middleName ? props.middleName : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Last Name</div>
                </td>
                <td className="colon">:</td>
                <td>{props.lastName}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Suffix Name</div>
                </td>
                <td className="colon">:</td>
                <td>{props.suffixName ? props.suffixName : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Extension Name</td>
                <td className="colon">:</td>
                <td>
                  {props.extensionName?.length > 0
                    ? props.extensionName?.map((extension) => (
                        <span> {extension.extensionName} </span>
                      ))
                    : " N/A"}
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* <div>Email: {props.email}</div> */}
        <div className="personal-info-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <LibraryBooksIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Personal Information</h1>
            </div>
          </div>
          <div className="personal-info-detail-cont">
            <table>
              <tr>
                <td className="label">
                  <div>Birthday</div>
                </td>
                <td className="colon">:</td>
                <td> {props.bday ? props.bday : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Age</div>
                </td>
                <td className="colon">:</td>
                <td>{props.age > 0 ? props.age + " years old" : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Place of Birth</div>
                </td>
                <td className="colon">:</td>
                <td>{props.placeofBirth ? props.placeofBirth : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Citizenship</div>
                </td>
                <td className="colon">:</td>
                <td>{props.citizenship ? props.citizenship : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Gender</div>
                </td>
                <td className="colon">:</td>
                <td> {props.gender ? props.gender : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Civil Status</div>
                </td>
                <td className="colon">:</td>
                <td> {props.civilStatus ? props.civilStatus : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Height</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.height ? formatHeight(props.height) : "N/A"}
                  {props.height !== ""
                    ? props.height.indexOf(".") !== -1
                      ? "in"
                      : "ft"
                    : ""}
                </td>
              </tr>
              <tr>
                <td className="label">
                  <div>Weight</div>
                </td>
                <td className="colon">:</td>
                <td>{props.weight ? props.weight + "kg" : "N/A"}</td>
              </tr>
              <tr>
                <td className="label">
                  <div>Bloodtype</div>
                </td>
                <td className="colon">:</td>
                <td>{props.bloodType ? props.bloodType : "N/A"}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="government-id-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <FeaturedVideoIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Government Issued ID</h1>
            </div>
          </div>
          <div className="gov-id-detail-cont">
            <table>
              <tr>
                <td className="label">
                  <div>GSIS ID</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.gssId
                    ? props.gssId.match(/\d{3}(?=\d{2,3})|\d+/g).join("-")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label">
                  <div>PAGIBIG ID</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.pagibigId
                    ? props.pagibigId.match(/\d{4}(?=\d{2,3})|\d+/g).join("-")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label">
                  <div>PHILHEALTH</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.philHealthId
                    ? props.philHealthId
                        .match(/\d{4}(?=\d{2,3})|\d+/g)
                        .join("-")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label">
                  <div>SSS NO</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.sssNo
                    ? props.sssNo.match(/\d{3}(?=\d{2,3})|\d+/g).join("-")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label">
                  <div>TIN NO</div>
                </td>
                <td className="colon">:</td>
                <td>
                  {props.tinNo
                    ? props.tinNo.match(/\d{3}(?=\d{2,3})|\d+/g).join("-")
                    : "N/A"}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoItem;
