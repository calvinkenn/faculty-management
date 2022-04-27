import React, { useEffect } from "react";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";

const PasswordEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      oldPassword: {
        value: "",
        isValid: true,
      },
      newPassword: {
        value: "",
        isValid: true,
      },
      confirmNewPassword: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/userChangePassword", //Change to account
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          oldPassword: formState.inputs.oldPassword.value,
          newPassword: formState.inputs.newPassword.value,
          confirmNewPassword: formState.inputs.confirmNewPassword.value,
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
          id="oldPassword"
          type="password"
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
          type="password"
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
          type="password"
          label="Confirm New Password"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.confirmNewPassword.value}
          initialValid={formState.inputs.confirmNewPassword.isValid}
        />
        <Button inverse type="submit">
          Save Info
        </Button>
      </form>
    </React.Fragment>
  );
};

export default PasswordEdit;
