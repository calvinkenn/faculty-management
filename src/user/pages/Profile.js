import React, { useState } from "react";

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

const menu = {
  overview: true,
  basicInformation: false,
  education: false,
  civilService: false,
  workExperience: false,
  training: false,
};

const Profile = (props) => {
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [isEditMode, setIsEditMode] = useState(false);

  const editModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const menuChangeHandler = (menuName) => {
    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsEditMode(false);
    setIsMenuActive(stateCopy);
  };

  return (
    <React.Fragment>
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
        <div style={{ width: "100%" }}>
          <TopActionBar
            inOverview={isMenuActive.overview}
            inBasicInformation={isMenuActive.basicInformation}
            updateEditModeState={editModeHandler}
            isEditMode={isEditMode}
            onClick={editModeHandler}
          />
          {isMenuActive.overview && <Overview />}
          {isMenuActive.basicInformation && (
            <BasicInfo isEditMode={isEditMode} />
          )}
          {isMenuActive.education && (
            <EducationalBackground isEditMode={isEditMode} />
          )}
          {isMenuActive.civilService && (
            <CivilService isEditMode={isEditMode} />
          )}
          {isMenuActive.workExperience && (
            <WorkExperience isEditMode={isEditMode} />
          )}
          {isMenuActive.training && <Training isEditMode={isEditMode} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
