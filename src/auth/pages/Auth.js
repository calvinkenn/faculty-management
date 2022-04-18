import React, { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";

import bulsuLogo from "../../assets/Image/bulsu.png";
import cictLogo from "../../assets/Image/cict.png";
import cictBuilding from "../../assets/Image/pimentel.png";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  // const authSubmitHandler = (event) => {
  //   event.preventDefault();
  //   console.log(formState.inputs);
  //   auth.login();
  // };
  const testLoginAdmin = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.loginAsAdmin();
  };
  const testLoginUser = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.loginAsUser();
  };

  return (
    <Card className="authentication">
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
        <div className="main-form-cont">
          {/* <Router>{routes}</Router> */}
          <h2 className="login-mode-title">{isLoginMode ? "LOGIN TO YOUR ACCOUNT" : "Register"}</h2>
          <form>
            {!isLoginMode && (
              <Input
                element="input"
                id="employeeNum"
                type="text"
                // label="Employee Number"
                placeholder="Employee Number"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <Input
                element="input"
                id="fName"
                type="text"
                // label="First Name"
                placeholder="First Name"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <Input
                element="input"
                id="lName"
                type="text"
                // label="Last Name"
                placeholder="Last Name"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="text"
              // label="Email"
              placeholder="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Invalid Email"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              // label="Password"
              placeholder="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Minimum of 6 characters"
              onInput={inputHandler}
            />
            {/* <Button type="submit">
              {isLoginMode ? "Test Log in User" : "Register"}
            </Button> */}
            <Button onClick={testLoginUser}>
              {isLoginMode ? "Test Log in User" : "Register"}
            </Button>
            {isLoginMode && (
              <Button onClick={testLoginAdmin}>Test Log in Admin</Button>
            )}
          </form>
          
          {isLoginMode ? 
            <h6>Don't have an account? <a onClick={switchModeHandler}>Create an account here</a>
            <h6>Forgot your password? <a onClick={switchModeHandler}>Reset your password here</a></h6></h6> : 
            <h6>Already have an account? <a onClick={switchModeHandler}>Login here</a></h6>
          }

          {/* <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? "Sign Up" : "Log in"}
          </Button> */}
        </div>
      </div>
      
    </Card>
  );
};

export default Auth;
