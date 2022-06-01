import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Button as muiBtn } from "@mui/material";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
// import SideDrawer from './SideDrawer';
// import Backdrop from '../UIElements/Backdrop';
import { AuthContext } from "../../context/auth-context";
import "./MainNavigation.css";
import bulsuLogo from "../../../assets/Image/bulsu.png";
import cictLogo from "../../../assets/Image/cict.png";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_OPTIONAL } from "../../utils/validators";
import Input from "../FormElements/Input";
import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import SuccessModal from "../UIElements/SuccessModal";
import LogoUpload from "../FormElements/LogoUpload";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const [isEditText, setIsEditText] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [message, setMessage] = useState("");
  const [headerData, setHeaderData] = useState({});

  useEffect(() => {
    const getHeaderData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/getHeader"
        );
        setHeaderData(responseData.headerData[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getHeaderData();
  }, [message]);

  const submitEditHandler = async (e) => {
    //confirm save on edit
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/editHeaderText", //Change to account
        "PATCH",
        JSON.stringify({
          id: headerData._id,
          headerText: formState.inputs.headerText.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setMessage(responseData.message);
    } catch (err) {
      console.log(err);
    }
    setIsEditText(false);
    setShowSaveConfirmModal(false);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      headerText: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const openEditTextHandler = () => {
    setIsEditText(true);
  };

  const closeEditTextHandler = () => {
    setIsEditText(false);
  };

  const cancelEditHandler = () => {
    setIsEditText(false);
    setShowConfirmModal(false);
  };

  const showEditWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const closeEditWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const showSaveConfirmHandler = () => {
    setShowSaveConfirmModal(true);
  };

  const closeSaveConfirmHandler = () => {
    setShowSaveConfirmModal(false);
  };

  const clearSuccess = () => {
    setMessage("");
  };

  const setMessageUpdate = (message) => {
    setMessage(message);
  };

  return (
    <React.Fragment>
      <SuccessModal success={message} onClear={clearSuccess} />
      <Modal
        show={showConfirmModal || showSaveConfirmModal}
        onCancel={
          showConfirmModal ? closeEditWarningHandler : closeSaveConfirmHandler
        }
        header={showConfirmModal ? "Cancel Edit?" : "Save Changes"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="mission-cancel-edit">
              <Button
                
                onClick={
                  showConfirmModal ? cancelEditHandler : submitEditHandler
                }
              >
                Yes
              </Button>
              <span />
              <Button
                danger
                onClick={
                  showConfirmModal
                    ? closeEditWarningHandler
                    : closeSaveConfirmHandler
                }
              >
                No
              </Button>
            </div>
          </React.Fragment>
        }
      >
        {showConfirmModal ? (
          <p>Do you want to cancel editing Header?</p>
        ) : (
          <p>Do you want to save changes to Header?</p>
        )}
      </Modal>
      <MainHeader>
        <h1 className="main-navigation__title">
          <div className="nav-logo-main-cont">
            <div>
              <img
                src={
                  headerData.headerImage !== ""
                    ? `http://localhost:5000/${headerData.headerImage}`
                    : cictLogo
                }
                alt="logo"
              />
            </div>
          </div>

          <div className="nav-title-cont">
            {!isEditText && (
              <h4>
                {headerData.headerText
                  ? headerData.headerText
                  : "College of Information and Communications Technology"}
              </h4>
            )}
          </div>
        </h1>
        {auth.isAdmin && (
          <LogoUpload
            center
            update={setMessageUpdate}
            previewUrl={headerData.headerImage}
            previewUrl2={headerData.headerImage}
            id={headerData._id}
            headerText={headerData.headerText}
          />
        )}
        <nav className="main-navigation__header-nav">
          <NavLinks
            inProfile={props.inProfile}
            inHome={props.inHome}
            inVMGO={props.inVMGO}
            announcementCount={props.announcementCount}
          />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
