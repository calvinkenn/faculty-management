import React, { useState } from "react";
import emailjs from "emailjs-com";

import Modal from "../../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import profilePic from "../../../assets/Image/Qw.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../item.css";

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const ResetItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const userResetHandler = async (event) => {
    let randomCharacters = makeid(4);
    const templateParams = {
      newPassword:
        props.lastName.toLowerCase() +
        props.employeeNum +
        "_" +
        randomCharacters,
      sendToThisEmail: props.email,
    };
    setShowConfirmModal(false);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/resetPasswordHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          newPass:
            props.lastName.toLowerCase() +
            props.employeeNum +
            "_" +
            randomCharacters,
        }),
        { "Content-Type": "application/json" }
      );

      emailjs
        .send(
          "service_d5emoql",
          "template_8qek2pc",
          templateParams,
          "Ot41VNtweh9noSj8e"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );

      props.updateResetUsers(
        responseData.updatedUser,
        responseData.permission + "_reset"
      );
      console.log(responseData.permission);
    } catch (err) {
      console.log(err);
    }
  };

  const showConfirmModalHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelHandler}
        header={"Reset this Account?"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={userResetHandler}>
              Yes
            </Button>
            <Button danger onClick={cancelHandler}>
              No
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and reset this account?</p>
      </Modal>
      <Card>
        <div className="container__image">
          <img
            src={
              props.profilePic !== ""
                ? `http://localhost:5000/${props.profilePic}`
                : profilePic
            }
            alt={props.firstName}
          />
        </div>
        <div className="faculty-details-cont">
          <div className="faculty-name-email-cont">
            <div>
              <h2>{props.firstName}</h2>
            </div>
            <span />
            <div>
              <h2>{props.lastName}</h2>
            </div>
            <span />
            <div className="email-cont">
              <ArrowBackIosIcon sx={{ fontSize: "12px" }} />
              {props.email}
              <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
            </div>
          </div>
          <div className="employeenum-fac-type">
            <div className="employee-num">
              <h4>{props.employeeNum}</h4>
              <h6>Employee Number</h6>
            </div>
            <span />
            <div className="fac-dept">
              <h4>{props.faculty ? props.faculty : "N/A"}</h4>
              <h6>Department</h6>
            </div>
            <span />
            <div className="emp-status">
              <h4> {props.employmentType ? props.employmentType : "N/A"}</h4>
              <h6>Employment Status</h6>
            </div>
            <div className="date-of-reg">
              <h4>
                {" "}
                {props.dateOfRegistration ? props.dateOfRegistration : "N/A"}
              </h4>
              <h6>Date of Registration</h6>
            </div>
          </div>
        </div>
        <Button onClick={showConfirmModalHandler}>Reset Password</Button>
      </Card>
    </React.Fragment>
  );
};

export default ResetItem;
