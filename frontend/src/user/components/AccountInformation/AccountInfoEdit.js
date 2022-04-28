import React, { useEffect } from "react";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
const AccountInfoEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      employeeNumber: {
        value: props.userEdit.employeeNum,
        isValid: true,
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
        isValid: true,
      },
      // oldPassword: {
      //   value: "",
      //   isValid: true,
      // },
      // newPassword: {
      //   value: "",
      //   isValid: true,
      // },
      // confirmNewPassword: {
      //   value: "",
      //   isValid: true,
      // },
    },
    false
  );

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editAccountInfo", //Change to account
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          employeeNum: formState.inputs.employeeNumber.value,
          faculty: formState.inputs.faculty.value,
          employmentType: formState.inputs.employmentType.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <Input
          element="input"
          id="employeeNumber"
          type="text"
          label="Employee Number"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.employeeNumber.value}
          initialValid={formState.inputs.employeeNumber.isValid}
        />
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
        <Input
          element="input"
          id="email"
          type="text"
          label="Email"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.email.value}
          initialValid={formState.inputs.email.isValid}
        />
        {/* <Input
          element="input"
          id="oldPassword"
          type="text"
          label="Old Password"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.oldPassword.value}
          initialValid={formState.inputs.oldPassword.isValid}
        />
        <Input
          element="input"
          id="newPassword"
          type="text"
          label="New Password"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.newPassword.value}
          initialValid={formState.inputs.newPassword.isValid}
        />
        <Input
          element="input"
          id="confirmNewPassword"
          type="text"
          label="Confirm New Password"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.confirmNewPassword.value}
          initialValid={formState.inputs.confirmNewPassword.isValid}
        /> */}
        <Button inverse type="submit">
          Save Info
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AccountInfoEdit;
