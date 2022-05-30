import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_PASSWORD_LOWERCASE,
  VALIDATOR_PASSWORD_SPECIAL,
  VALIDATOR_PASSWORD_UPPERCASE,
  VALIDATOR_PASSWORD_NUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";

//mikko is here
import SettingsIcon from "@mui/icons-material/Settings";
//end

const PasswordEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [passwordErr, setPasswordErr] = useState();
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

  useEffect(() => {
    const passwordValidator = () => {
      if (!formState.inputs.newPassword.isValid) {
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const passwordLength = formState.inputs.newPassword.value.trim().length;
        const uppercasePassword = uppercaseRegExp.test(
          formState.inputs.newPassword.value
        );
        const lowercasePassword = lowercaseRegExp.test(
          formState.inputs.newPassword.value
        );
        const digitsPassword = digitsRegExp.test(
          formState.inputs.newPassword.value
        );
        const specialCharPassword = specialCharRegExp.test(
          formState.inputs.newPassword.value
        );
        const minLengthPassword = minLengthRegExp.test(
          formState.inputs.newPassword.value
        );
        let errMsg = "";
        if (passwordLength === 0) {
          errMsg = "Password is empty";
        } else if (!minLengthPassword) {
          errMsg = "At least minumum 8 characters";
        } else if (!uppercasePassword) {
          errMsg = "At least one Uppercase";
        } else if (!lowercasePassword) {
          errMsg = "At least one Lowercase";
        } else if (!digitsPassword) {
          errMsg = "At least one digit";
        } else if (!specialCharPassword) {
          errMsg = "At least one Special Characters";
        } else {
          errMsg = "";
        }
        setPasswordErr(errMsg);
      }
    };
    passwordValidator();
  }, [formState.inputs.newPassword.value]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <div className="password-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <SettingsIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Change Password</h1>
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
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your old password"
                  onInput={inputHandler}
                  initialValue={formState.inputs.oldPassword.value}
                  initialValid={formState.inputs.oldPassword.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment position="start">
                          <LockIcon sx={{fontSize: '20px'}} />
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
              </div>
              <div className="new-pass-cont">
                <Input
                  element="input"
                  id="newPassword"
                  type="password"
                  label="New Password"
                  validators={[
                    VALIDATOR_MINLENGTH(8),
                    VALIDATOR_PASSWORD_UPPERCASE(),
                    VALIDATOR_PASSWORD_LOWERCASE(),
                    VALIDATOR_PASSWORD_NUMBER(),
                    VALIDATOR_PASSWORD_SPECIAL(),
                  ]}
                  helperText={passwordErr}
                  onInput={inputHandler}
                  initialValue={formState.inputs.newPassword.value}
                  initialValid={formState.inputs.newPassword.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment position="start">
                          <LockIcon sx={{fontSize: '20px'}} />
                        </InputAdornment>
                      </p>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment position="start">
                          <CheckCircleRoundedIcon sx={{fontSize: '20px'}} />
                        </InputAdornment>
                      </p>
                    ),
                  }}
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
