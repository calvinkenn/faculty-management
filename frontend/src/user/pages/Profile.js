import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import { useHttpClient } from "../../shared/hooks/http-hook";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import AccountInfo from "../components/AccountInformation/AccountInfo";
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';

const menu = {
  overview: true,
  accountInformation: false,
  basicInformation: false,
  contactInformation: false,
  education: false,
  civilService: false,
  workExperience: false,
  training: false,
};

const Profile = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState();
  const userIdByParams = useParams().userId;

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
    const getCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/userData",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
            token: storedData.token,
          }),
          { "Content-Type": "application/json" }
        );
        setUserData(responseData.userData);
      } catch (err) {}
    };
    getCurrentUser();
    setSuccess("");
  }, [sendRequest, success]);

  console.log(userData);
  //function to update state
  const updateState = (data, message) => {
    setIsEditMode(false);
    setIsAddMode(false);
    // setUserData(data);
    setSuccess(message);
  };
  //function for clearing if there is no error
  const clearSuccess = () => {
    setSuccess(null);
  };

  return (
    <React.Fragment>
      <div className="user-main">
        <div className="user-main-container">
          <SuccessModal success={success} onClear={clearSuccess} />
          <MainNavigation />
          <div className="profile-container">
            <SideBox className="side-container">
              <div className="side-container__image">
                <img
                  src={
                    userData.profilePic !== ""
                      ? `http://localhost:5000/${userData.profilePic}`
                      : profile
                  }
                  alt="profile-pic"
                />
              </div>
              <ul>
                <li
                  className={isMenuActive.overview ? "active" : ""}
                  onClick={() => menuChangeHandler("overview")}
                >
                  <span>Overview</span>
                </li>
                <li
                  className={isMenuActive.accountInformation ? "active" : ""}
                  onClick={() => menuChangeHandler("accountInformation")}
                >
                 <span>Account Information</span>
                </li>
                <li
                  className={isMenuActive.basicInformation ? "active" : ""}
                  onClick={() => menuChangeHandler("basicInformation")}
                >
                  <span>Basic Information</span>
                </li>
                <li
                  className={isMenuActive.contactInformation ? "active" : ""}
                  onClick={() => menuChangeHandler("contactInformation")}
                >
                  <span>Contact Information</span>
                </li>
                <li
                  className={isMenuActive.education ? "active" : ""}
                  onClick={() => menuChangeHandler("education")}
                >
                  <span>Educational Background</span>
                </li>
                <li
                  className={isMenuActive.civilService ? "active" : ""}
                  onClick={() => menuChangeHandler("civilService")}
                >
                  <span>Civil Service</span>
                </li>
                <li
                  className={isMenuActive.workExperience ? "active" : ""}
                  onClick={() => menuChangeHandler("workExperience")}
                >
                  <span>Work Experience</span>
                </li>
                <li
                  className={isMenuActive.training ? "active" : ""}
                  onClick={() => menuChangeHandler("training")}
                >
                  <span>Trainings and Seminars</span>
                </li>
              </ul>
            </SideBox>
            <div className="content-container">
              <TopActionBar
                inOverview={isMenuActive.overview}
                inAccountInformation={isMenuActive.accountInformation}
                inBasicInformation={isMenuActive.basicInformation}
                inContactInformation={isMenuActive.contactInformation}
                inEducation={isMenuActive.education}
                updateEditModeState={editModeHandler}
                updateAddModeState={addModeHandler}
                isEditMode={isEditMode}
                isAddMode={isAddMode}
              />
              {isMenuActive.overview && <Overview userData={userData} />}
              {isMenuActive.accountInformation && (
                <AccountInfo
                  isEditMode={isEditMode}
                  setEditMode={updateState}
                  changePassMode={isAddMode}
                  changePasswordHandler={addModeHandler}
                  userData={userData}
                />
              )}
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
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                />
              )}
              {isMenuActive.civilService && (
                <CivilService
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                />
              )}
              {isMenuActive.workExperience && (
                <WorkExperience
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                />
              )}
              {isMenuActive.training && (
                <Training
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
