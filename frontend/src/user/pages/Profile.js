import React, { useContext, useState, useEffect } from "react";

import profile from "../../assets/Image/Qw.png";
import Overview from "../components/Overview/Overview";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import SideBox from "../../shared/components/SideMenu/SideBox";
import EducationalBackground from "../components/Education/EducationalBackground";
import BasicInfo from "../components/BasicInformation/BasicInfo";
import CivilService from "../components/CivilService/CivilService";
import WorkExperience from "../components/WorkExperience/WorkExperience";
import Training from "../components/Training/Training";
import "./Profile.css";
import TopActionBar from "../components/TopActionBar";
import ContactInfo from "../components/ContactInformation/ContactInfo";
import { AuthContext } from "../../shared/context/auth-context";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";


const menu = {
  overview: true,
  basicInformation: false,
  contactInformation: false,
  education: false,
  civilService: false,
  workExperience: false,
  training: false,
};

const Profile = (props) => {
  const auth = useContext(AuthContext);
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState();

  const editModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const addModeHandler = () => {
    setIsAddMode((prevState) => !prevState);
  };

  const menuChangeHandler = (menuName) => {
    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsEditMode(false);
    setIsAddMode(false);
    setIsMenuActive(stateCopy);
  };
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/users/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
        }),
      });
      const responseData = await response.json();
      setUserData(responseData.userData);
    };
    sendRequest();
  }, []);

  //function to update state
  const updateState = (data, message) => {
    setIsEditMode(false);
    setIsAddMode(false);
    setUserData(data);
    setSuccess(message);
  };
  //function for clearing if there is no error
  const clearSuccess = () => {
    setSuccess(null);
  };
  return (
    <React.Fragment>
      <div className="user-main">
        <div className="user-side-nav">
          <div className="side-nav-menu">
            {/* <MenuIcon /> */}
          </div>
        </div>
        <div className="user-main-container">
          <SuccessModal success={success} onClear={clearSuccess} />
          <MainNavigation />
          <div className="profile-container">
            <SideBox className="side-container">
              <div className="side-container__image">
                <img src={profile} alt="profile-pic" />
              </div>
              <ul>
                <li
                  className={isMenuActive.overview ? "active" : ""}
                  onClick={() => menuChangeHandler("overview")}
                >
                  Overview
                </li>
                <li
                  className={isMenuActive.basicInformation ? "active" : ""}
                  onClick={() => menuChangeHandler("basicInformation")}
                >
                  Basic Information
                </li>
                <li
                  className={isMenuActive.contactInformation ? "active" : ""}
                  onClick={() => menuChangeHandler("contactInformation")}
                >
                  Contact Information
                </li>
                <li
                  className={isMenuActive.education ? "active" : ""}
                  onClick={() => menuChangeHandler("education")}
                >
                  Educational Background
                </li>
                <li
                  className={isMenuActive.civilService ? "active" : ""}
                  onClick={() => menuChangeHandler("civilService")}
                >
                  Civil Service
                </li>
                <li
                  className={isMenuActive.workExperience ? "active" : ""}
                  onClick={() => menuChangeHandler("workExperience")}
                >
                  Work Experience
                </li>
                <li
                  className={isMenuActive.training ? "active" : ""}
                  onClick={() => menuChangeHandler("training")}
                >
                  Trainings and Seminars
                </li>
              </ul>
            </SideBox>
            <div className="content-container">
              <TopActionBar
                inOverview={isMenuActive.overview}
                inBasicInformation={isMenuActive.basicInformation}
                inContactInformation={isMenuActive.contactInformation}
                inEducation={isMenuActive.education}
                updateEditModeState={editModeHandler}
                updateAddModeState={addModeHandler}
                isEditMode={isEditMode}
                isAddMode={isAddMode}
              />
              {isMenuActive.overview && <Overview userData={userData} />}
              {isMenuActive.basicInformation && (
                <BasicInfo
                  isEditMode={isEditMode}
                  setEditMode={updateState}
                  userData={userData}
                />
              )}
              {isMenuActive.contactInformation && (
                <ContactInfo
                  isEditMode={isEditMode}
                  setEditMode={updateState}
                  userData={userData}
                />
              )}
              {isMenuActive.education && (
                <EducationalBackground
                  isAddMode={isAddMode}
                  setIsAddMode = {setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                />
              )}
              {isMenuActive.civilService && <CivilService isAddMode={isEditMode} />}
              {isMenuActive.workExperience && (
                <WorkExperience isAddMode={isEditMode} />
              )}
              {isMenuActive.training && <Training isAddMode={isEditMode} />}
            </div>
          </div>
        </div>
      </div>
      

    </React.Fragment>
  );
};

export default Profile;
