import React, { useState, useContext, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import {
  VALIDATOR_CONFIRMPASSWORD,
  VALIDATOR_EMAIL,
  VALIDATOR_EMPLOYEENUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD_LOWERCASE,
  VALIDATOR_PASSWORD_NUMBER,
  VALIDATOR_PASSWORD_SPECIAL,
  VALIDATOR_PASSWORD_UPPERCASE,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import "./Auth.css";

import bulsuLogo from "../../assets/Image/bulsu.png";
import cictLogo from "../../assets/Image/cict.png";
import cictBuilding from "../../assets/Image/pimentel.png";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isAgree, setIsAgree] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [passwordErr, setPasswordErr] = useState();
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
      employeeNum: {
        value: "",
        isValid: false,
      },
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginModeHandler = () => {
    setIsRegisterMode(false);
    setIsLoginMode(true);
    setIsResetMode(false);
    // switchModeHandler();
  };

  const registerModeHandler = () => {
    setIsRegisterMode(true);
    setIsLoginMode(false);
    setIsResetMode(false);
    // switchModeHandler();
  };

  const resetModeHandler = () => {
    setIsRegisterMode(false);
    setIsLoginMode(false);
    setIsResetMode(true);
    // switchModeHandler();
  };

  //added by ralph
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    //checks if the state is in login mode
    if (isLoginMode) {
      //code for login
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else if (isRegisterMode) {
      //code for signup
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            employeeNum: formState.inputs.employeeNum.value
              .toString()
              .replace(/-/g, ""),
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setIsAgree(false);
        loginModeHandler();
      } catch (err) {
        setIsAgree(false);
      }
    } else if (isResetMode) {
      //code for reset
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/reset",
          "PATCH",
          JSON.stringify({
            email: formState.inputs.email.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        loginModeHandler();
      } catch (err) {}
    }
  };

  const agreeHandler = (event) => {
    setIsAgree(event.target.checked);
  };

  const showAgreementHandler = () => {
    setShowConfirmModal(true);
  };

  const closeAgeementHandler = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const passwordValidator = () => {
      if (!formState.inputs.password.isValid) {
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const passwordLength = formState.inputs.password.value.trim().length;
        const uppercasePassword = uppercaseRegExp.test(
          formState.inputs.password.value
        );
        const lowercasePassword = lowercaseRegExp.test(
          formState.inputs.password.value
        );
        const digitsPassword = digitsRegExp.test(
          formState.inputs.password.value
        );
        const specialCharPassword = specialCharRegExp.test(
          formState.inputs.password.value
        );
        const minLengthPassword = minLengthRegExp.test(
          formState.inputs.password.value
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
  }, [formState.inputs.password.value]);

  const ALPHA_NUMERIC_DASH_REGEX = /^[0-9-]+$/;

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header={<div>Terms of Use {"&"} Privacy Policy</div>}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeAgeementHandler}>
              Ok
            </Button>
          </React.Fragment>
        }
      >
        <p>
          The protection of your personal data is very important to CICT.
          College of Information and Communications Technology will process your
          personal data in compliance with applicable data protection laws. The
          information you provide in completing this registration will be used
          for eligibility verification only and processed according to CICT
          which includes important information on why and how CICT is processing
          your personal data.
          <br />
          <br />I agree to the use or processing of my personal and sensitive
          personal information by CICT for the purpose of profiling related
          activities in accordance with the applicable local data protection
          laws.
        </p>
      </Modal>
      <SuccessModal success={success} onClear={clearSuccess} />
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="main-container">
          <div className="main-img-cont">
            <div className="cict-text-container">
              <div className="logo-container">
                <img src={bulsuLogo} />
                <img src={cictLogo} />
              </div>
              <div className="txt-container">
                <h3>College of Information and Communications Technology</h3>
                <h5>Faculty Management Information Systems</h5>
              </div>
            </div>
            <div className="img-container">
              <img src={cictBuilding} />
            </div>
          </div>
          {/* {!isLoading && ( */}
          <div className="main-form-cont">
            {/* <Router>{routes}</Router> */}
            <h2 className="login-mode-title">
              {isLoginMode && "LOGIN TO YOUR ACCOUNT"}{" "}
              {isRegisterMode && "CREATE YOUR ACCOUNT"}
              {isResetMode && "RESET YOUR ACCOUNT"}
            </h2>
            <form onSubmit={authSubmitHandler}>
              <div className="employeeNo-container">
                {isRegisterMode && (
                  <Input
                    element="input"
                    id="employeeNum"
                    type="text"
                    onKeyDown={(event) => {
                      if (event.keyCode !== 8) {
                        if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                          event.preventDefault();
                        }
                      }
                    }}
                    validators={[VALIDATOR_EMPLOYEENUMBER()]}
                    helperText="Please input a valid employee number. Format-(XXXX-X)"
                    onInput={inputHandler}
                    label="Employee Number"
                    variant="outlined"
                  />
                )}
              </div>
              <div className="fullName-container">
                <div className="firstName-container">
                  {isRegisterMode && (
                    <Input
                      element="input"
                      id="firstName"
                      type="text"
                      validators={[VALIDATOR_REQUIRE()]}
                      helperText="Please input your first name."
                      onInput={inputHandler}
                      label="First Name"
                      variant="outlined"
                    />
                  )}
                </div>
                <div className="lastName-container">
                  {isRegisterMode && (
                    <Input
                      element="input"
                      id="lastName"
                      type="text"
                      validators={[VALIDATOR_REQUIRE()]}
                      helperText="Please input your last name."
                      onInput={inputHandler}
                      label="Last Name"
                      variant="outlined"
                    />
                  )}
                </div>
              </div>

              <div className="email-pass-container">
                {isLoginMode && (
                  <div className="email-container">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      validators={[VALIDATOR_REQUIRE()]}
                      helperText="Please input a valid username."
                      onInput={inputHandler}
                      label="Email/Employee Number"
                      variant="outlined"
                    />
                  </div>
                )}
                {isResetMode && (
                  <div className="email-container">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      validators={[VALIDATOR_EMAIL()]}
                      helperText="Please input a valid email."
                      onInput={inputHandler}
                      label="Email"
                      variant="outlined"
                    />
                  </div>
                )}
                {isRegisterMode && (
                  <div className="email-container">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      validators={[VALIDATOR_EMAIL()]}
                      helperText="Please input a valid email."
                      onInput={inputHandler}
                      label="Email"
                      variant="outlined"
                    />
                  </div>
                )}
                {!isLoading && isRegisterMode && (
                  <React.Fragment>
                    <div className="password-container">
                      {!isResetMode && (
                        <Input
                          element="input"
                          id="password"
                          type="password"
                          validators={[
                            VALIDATOR_MINLENGTH(8),
                            VALIDATOR_PASSWORD_UPPERCASE(),
                            VALIDATOR_PASSWORD_LOWERCASE(),
                            VALIDATOR_PASSWORD_NUMBER(),
                            VALIDATOR_PASSWORD_SPECIAL(),
                          ]}
                          helperText={passwordErr}
                          onInput={inputHandler}
                          label="Password"
                          variant="outlined"
                        />
                      )}
                    </div>
                    <div className="password-container">
                      {!isResetMode && (
                        <Input
                          element="input"
                          id="confirmPassword"
                          type="password"
                          validators={[
                            VALIDATOR_CONFIRMPASSWORD(
                              formState.inputs.password.value
                            ),
                          ]}
                          helperText="Please make sure your password match."
                          onInput={inputHandler}
                          label="Confirm Password"
                          variant="outlined"
                        />
                      )}
                    </div>
                  </React.Fragment>
                )}
                {!isLoading && isLoginMode && (
                  <div className="password-container">
                    {!isResetMode && (
                      <Input
                        element="input"
                        id="password"
                        type="password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        helperText="Please input a minimum of 8 characters."
                        onInput={inputHandler}
                        label="Password"
                        variant="outlined"
                      />
                    )}
                  </div>
                )}
                <div className="password-container">
                  {isRegisterMode && (
                    <FormControlLabel
                      disabled={!formState.isValid}
                      label={
                        <div>
                          I agree to the
                          <a onClick={showAgreementHandler}>
                            {" "}
                            Terms of Use {"&"} Privacy Policy
                          </a>
                        </div>
                      }
                      control={
                        <Checkbox checked={isAgree} onChange={agreeHandler} />
                      }
                    />
                  )}
                </div>
              </div>

              {isLoginMode && (
                <Button
                  type="submit"
                  disabled={
                    !formState.inputs.email.isValid ||
                    !formState.inputs.password.isValid
                  }
                >
                  Login
                </Button>
              )}
              {isRegisterMode && (
                <Button
                  type="submit"
                  disabled={
                    !formState.inputs.email.isValid ||
                    !formState.inputs.password.isValid ||
                    !formState.inputs.employeeNum.isValid ||
                    !formState.inputs.firstName.isValid ||
                    !formState.inputs.lastName.isValid ||
                    !formState.inputs.confirmPassword.isValid ||
                    !isAgree
                  }
                >
                  Register
                </Button>
              )}
              {isResetMode && (
                <Button
                  type="submit"
                  disabled={!formState.inputs.email.isValid}
                >
                  Reset Password
                </Button>
              )}
            </form>

            {isLoginMode && (
              <h6>
                Don't have an account?{" "}
                <a onClick={registerModeHandler}>Create an account here</a>
                <h6>
                  Forgot your password?{" "}
                  <a onClick={resetModeHandler}>Reset your password here</a>
                </h6>
              </h6>
            )}
            {isRegisterMode && (
              <h6>
                Already have an account?{" "}
                <a onClick={loginModeHandler}>Login here</a>
              </h6>
            )}
            {isResetMode && (
              <h6>
                <a onClick={loginModeHandler}>Back to login</a>
              </h6>
            )}
          </div>
          {/* )} */}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
