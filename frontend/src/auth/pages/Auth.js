import React, { useState, useContext } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
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
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

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
    switchModeHandler();
  };

  const registerModeHandler = () => {
    setIsRegisterMode(true);
    setIsLoginMode(false);
    setIsResetMode(false);
    switchModeHandler();
  };

  const resetModeHandler = () => {
    setIsRegisterMode(false);
    setIsLoginMode(false);
    setIsResetMode(true);
    switchModeHandler();
  };

  const switchModeHandler = () => {
    if (isRegisterMode) {
      setFormData(
        {
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: "",
            isValid: false,
          },
          employeeNum: undefined,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.employeeNum.isValid &&
          formState.inputs.firstName.isValid &&
          formState.inputs.lastName.isValid
      );
    } else if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
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
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else if (isResetMode) {
      setFormData(
        {
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: "",
            isValid: false,
          },
        },
        formState.inputs.email.isValid
      );
    }
  };

  const testLoginAdmin = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.loginAsAdmin();
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
        if (responseData.admin) {
          auth.loginAsAdmin(responseData.adminId, responseData.token);
        } else {
          auth.login(responseData.userId, responseData.token);
        }
      } catch (err) {}
    } else if (isRegisterMode) {
      //code for signup
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            employeeNum: formState.inputs.employeeNum.value,
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        switchModeHandler();
      } catch (err) {}
    } else if (isResetMode) {
      //code for signup
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
        // switchModeHandler();
      } catch (err) {}
    }
  };

  const agreeHandler = (event) => {
    setIsAgree(event.target.checked);
  };

  return (
    <React.Fragment>
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
          {!isLoading && (
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
                      validators={[VALIDATOR_REQUIRE()]}
                      helperText="Please input your employee number."
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
                  <div className="password-container">
                    {!isResetMode && (
                      <Input
                        element="input"
                        id="password"
                        type="password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        helperText="Please input a minimum of 6 characters."
                        onInput={inputHandler}
                        label="Password"
                        variant="outlined"
                      />
                    )}
                  </div>
                  <div className="password-container">
                    {isRegisterMode && (
                      <FormControlLabel
                        disabled={!formState.isValid}
                        label="I agree"
                        control={
                          <Checkbox checked={isAgree} onChange={agreeHandler} />
                        }
                      />
                    )}
                  </div>
                </div>

                {isLoginMode && <Button type="submit">Login</Button>}
                {isRegisterMode && (
                  <Button
                    type="submit"
                    disabled={!formState.isValid || !isAgree}
                  >
                    Register
                  </Button>
                )}
                {isResetMode && <Button type="submit">Reset Password</Button>}
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
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
