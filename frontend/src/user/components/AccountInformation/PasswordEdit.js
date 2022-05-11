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

//mikko is here
import SettingsIcon from '@mui/icons-material/Settings';
//end

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
        <div className="password-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
            <SettingsIcon  sx={{fontSize: "30px"}}/><h1 className="MarginLang">Change Password</h1>
            </div>
          </div>
          <div className="password-details-edit">
            <div className="password-input-cont">
              <div className="old-pass-cont">
                <Input
                  element="input"
                  id="oldPassword"
                  type="password"
                  label="Old Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  helperText="Please input minimum of 6 characters"
                  onInput={inputHandler}
                  initialValue={formState.inputs.oldPassword.value}
                  initialValid={formState.inputs.oldPassword.isValid}
                  required
                />
              </div>
              <div className="new-pass-cont">
                <Input
                  element="input"
                  id="newPassword"
                  type="password"
                  label="New Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  helperText="Please input minimum of 6 characters"
                  onInput={inputHandler}
                  initialValue={formState.inputs.newPassword.value}
                  initialValid={formState.inputs.newPassword.isValid}
                  required
                />
              </div>
              <div className="confirm-pass-cont">
                <Input
                  element="input"
                  id="confirmNewPassword"
                  type="password"
                  label="Confirm New Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  helperText="Please input minimum of 6 characters"
                  onInput={inputHandler}
                  initialValue={formState.inputs.confirmNewPassword.value}
                  initialValid={formState.inputs.confirmNewPassword.isValid}
                  required
                />
              </div>
            </div>
            <div className="password-submit-btn">
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

export default PasswordEdit;
