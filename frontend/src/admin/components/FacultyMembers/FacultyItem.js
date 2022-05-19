import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/FormElements/Input";
import {
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Modal from "../../../shared/components/UIElements/Modal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import profilePic from "../../../assets/Image/Qw.png";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../item.css";

const FacultyItem = (props) => {
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      note: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const userDeactivateHandler = async (event) => {
    setShowConfirmModal(false);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/deactivateAccount",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          permissionUpdate: "deactivated",
          deactivateNote: formState.inputs.note.value,
        }),
        { "Content-Type": "application/json" }
      );
      props.updateActiveUsers(
        responseData.activeUsers,
        responseData.permission
      );
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
        header={"Deactivate this Account?"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={userDeactivateHandler}>
              Yes
            </Button>
            <Button danger onClick={cancelHandler}>
              No
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and deactivate this account?</p>
        <br />
        <Input
          element="textarea"
          id="note"
          type="text"
          label="Deactivation Reason/Note"
          minRows={2}
          width={400}
          validators={[VALIDATOR_OPTIONAL()]}
          helperText="Please input the reason/note for deactivation"
          onInput={inputHandler}
          initialValue={formState.inputs.note.value}
          initialValid={formState.inputs.note.isValid}
        />
      </Modal>
      <Card>
        <div className="faculty-card-container">
          <Link to={`/admin/profile/${props.userId}`}>
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
                  <h4>
                    {" "}
                    {props.employmentType ? props.employmentType : "N/A"}
                  </h4>
                  <h6>Employment Status</h6>
                </div>
                <div className="date-of-reg">
                  <h4>
                    {" "}
                    {props.dateOfRegistration
                      ? props.dateOfRegistration
                      : "N/A"}
                  </h4>
                  <h6>Date of Registration</h6>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <Button onClick={showConfirmModalHandler}>
          <RemoveCircleIcon sx={{ fontSize: "40px" }} />
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default FacultyItem;
