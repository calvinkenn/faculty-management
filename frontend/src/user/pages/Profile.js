import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
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
import { useHttpClient } from "../../shared/hooks/http-hook";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import AccountInfo from "../components/AccountInformation/AccountInfo";
import ProfileUpload from "../../shared/components/FormElements/ProfileUpload";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isMenuActive, setIsMenuActive] = useState(menu);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [civilServiceData, setCivilServiceData] = useState({});
  const [trainingData, setTrainingData] = useState({});
  const [workData, setWorkData] = useState({});
  const [success, setSuccess] = useState();
  const [isPrintMode, setIsPrintMode] = useState(props.isPrintMode);

  const [editingPageData, setEditingPageData] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const userIdByParams = useParams().userId;

  const printModeHandler = () => {
    setIsPrintMode((prevState) => !prevState);
  };

  const editModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const addModeHandler = () => {
    setIsAddMode((prevState) => !prevState);
  };

  const menuChangeHandler = (menuName) => {
    if (isEditMode || isAddMode) {
      setShowConfirmModal(true);
      return;
    }

    const stateCopy = { ...menu };
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false)); //Set All Button False
    stateCopy[menuName] = true; //Set Button True
    setIsEditMode(false);
    setIsAddMode(false);
    setIsPrintMode(false);
    setIsMenuActive(stateCopy);
  };

  const closeEditingDataHandler = () => {
    setIsAddMode(false);
    setIsEditMode(false);
    setShowConfirmModal(false);
  };

  const cancelEditingDataHandler = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    //Get Basic Info
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
  }, [sendRequest, success]);

  useEffect(() => {
    //Get Education
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getEducation = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/getUserEducation",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
          }),
          { "Content-Type": "application/json" }
        );
        setEducationData(responseData.userEducation);
      } catch (err) {}
    };
    getEducation();
  }, [sendRequest, success]);

  useEffect(() => {
    //Get Civil Service
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getCivil = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/getUserCivil",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
          }),
          { "Content-Type": "application/json" }
        );
        setCivilServiceData(responseData.userCivil);
      } catch (err) {}
    };
    getCivil();
  }, [sendRequest, success]);

  useEffect(() => {
    //Get Work Experience Data
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getWorkData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/getWorkExperience",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
          }),
          { "Content-Type": "application/json" }
        );
        setWorkData(responseData.WorkExperience);
      } catch (err) {}
    };
    getWorkData();
  }, [sendRequest, success]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const getTrainingData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/getUserTraining",
          "POST",
          JSON.stringify({
            userId: userIdByParams ? userIdByParams : storedData.userId,
          }),
          { "Content-Type": "application/json" }
        );
        setTrainingData(responseData.userTraining);
      } catch (err) {}
    };
    getTrainingData();
  }, [sendRequest, success]);

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
    setSuccess("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal
        show={showConfirmModal}
        header="Cancel editing?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeEditingDataHandler}>
              YES
            </Button>
            <Button onClick={cancelEditingDataHandler}>NO</Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to cancel {isEditMode && "editing"}{" "}
          {isAddMode && "adding"} data? Changes will not be saved!
        </p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="user-main">
        <div className="user-main-container">
          <SuccessModal success={success} onClear={clearSuccess} />
          <MainNavigation inProfile={true} />
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
                {!userIdByParams && (
                  <ProfileUpload
                    center
                    id="profilePic"
                    updateProfile={updateState}
                    previewUrl={userData.profilePic}
                  />
                )}
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
                updatePrintModeState={printModeHandler}
                isEditMode={isEditMode}
                isAddMode={isAddMode}
                isPrintMode={isPrintMode}
              />

              {isMenuActive.overview && (
                <Overview
                  userData={userData}
                  educationData={educationData}
                  civilServiceData={civilServiceData}
                  workData={workData}
                  trainingData={trainingData}
                  isPrintMode={isPrintMode}
                  updatePrintModeState={printModeHandler}
                />
              )}
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
                  educationData={educationData}
                  userUpdate={updateState}
                />
              )}
              {isMenuActive.civilService && (
                <CivilService
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                  civilServiceData={civilServiceData}
                  userUpdate={updateState}
                />
              )}
              {isMenuActive.workExperience && (
                <WorkExperience
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                  workData={workData}
                  userUpdate={updateState}
                />
              )}
              {isMenuActive.training && (
                <Training
                  isAddMode={isAddMode}
                  setIsAddMode={setIsAddMode}
                  isEditMode={isEditMode}
                  updateEditModeState={editModeHandler}
                  updateAddModeState={addModeHandler}
                  trainingData={trainingData}
                  userUpdate={updateState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Profile;
