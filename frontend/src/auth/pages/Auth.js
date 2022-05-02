import React, { useState, useContext } from "react";

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
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

import bulsuLogo from "../../assets/Image/bulsu.png";
import cictLogo from "../../assets/Image/cict.png";
import cictBuilding from "../../assets/Image/pimentel.png";

const Auth = () => {
  const auth = useContext(AuthContext);
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
          ...formState.inputs,
          employeeNum: undefined,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
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
        false
      );
    } else if (isResetMode) {
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
          password: {
            value: "",
            isValid: false,
          },
        },
        false
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
                {isLoginMode ? "LOGIN TO YOUR ACCOUNT" : "CREATE YOUR ACCOUNT"}
              </h2>
              <form onSubmit={authSubmitHandler}>
                <div className="employeeNo-container">
                  {isRegisterMode && (
                    <Input
                      element="input"
                      id="employeeNum"
                      type="text"
                      validators={[VALIDATOR_MINLENGTH(2)]}
                      helperText="Minimum of 2 characters."
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
                        validators={[VALIDATOR_MINLENGTH(2)]}
                        helperText="Minimum of 2 characters."
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
                        validators={[VALIDATOR_MINLENGTH(2)]}
                        helperText="Minimum of 2 characters."
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
                      helperText="Invalid Email."
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
                        helperText="Minimum of 6 characters."
                        onInput={inputHandler}
                        label="Password"
                        variant="outlined"
                      />
                    )}
                  </div>
                </div>

                <Button type="submit">
                  {isLoginMode && "Login"}
                  {isRegisterMode && "Register"}
                  {isResetMode && "Reset Password"}
                </Button>
              </form>

              {isLoginMode ? (
                <h6>
                  Don't have an account?{" "}
                  <a onClick={registerModeHandler}>Create an account here</a>
                  <h6>
                    Forgot your password?{" "}
                    <a onClick={resetModeHandler}>Reset your password here</a>
                  </h6>
                </h6>
              ) : (
                <h6>
                  Already have an account?{" "}
                  <a onClick={loginModeHandler}>Login here</a>
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
