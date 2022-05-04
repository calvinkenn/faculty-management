import React, { useState } from "react";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
const AccountInfoEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      employeeNum: {
        value: props.userEdit.employeeNum,
        isValid: false,
      },
      faculty: {
        value: props.userEdit.faculty,
        isValid: true,
      },
      employmentType: {
        value: props.userEdit.employmentType,
        isValid: true,
      },
      email: {
        value: props.userEdit.email,
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("employeeNum", formState.inputs.employeeNum.value);
      formData.append("faculty", formState.inputs.faculty.value);
      formData.append("employmentType", formState.inputs.employmentType.value);
      formData.append("email", formState.inputs.email.value);

      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editAccountInfo", //Change to account
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          employeeNum: formState.inputs.employeeNum.value,
          faculty: formState.inputs.faculty.value,
          employmentType: formState.inputs.employmentType.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <div className="account-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Account Information</h1>
            </div>
          </div>
          <div className="acc-details-edit">
            <div className="acc-input-edit">
              <div className="employee-num-cont">
                <Input
                  element="input"
                  id="employeeNum"
                  type="number"
                  label="Employee Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input employee number"
                  onInput={inputHandler}
                  initialValue={formState.inputs.employeeNum.value}
                  initialValid={formState.inputs.employeeNum.isValid}
                  required
                />
              </div>
              <div className="faculty-type-cont">
                <Input
                  element="select"
                  id="faculty"
                  type="text"
                  label="Faculty"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={["BSIT", "BLIS", "ALLIED"]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.faculty.value}
                  initialValid={formState.inputs.faculty.isValid}
                />
              </div>
              <div className="employment-type-cont">
                <Input
                  element="select"
                  id="employmentType"
                  type="text"
                  label="Employment Type"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={["Full Time", "Part Time"]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.employmentType.value}
                  initialValid={formState.inputs.employmentType.isValid}
                />
              </div>
              <div className="email-edit-cont">
                <Input
                  element="input"
                  id="email"
                  type="text"
                  label="Email"
                  validators={[VALIDATOR_EMAIL()]}
                  helperText="Please input valid email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.email.value}
                  initialValid={formState.inputs.email.isValid}
                  required
                />
              </div>
            </div>
            <div className="acc-edit-btn">
              <Button inverse type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AccountInfoEdit;
