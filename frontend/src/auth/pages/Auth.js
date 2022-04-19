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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          employeeNum: undefined,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
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

  //added by ralph
  const authSubmitHandler = async event =>{
    event.preventDefault();

    //checks if the state is in login mode
    if(isLoginMode){
      //code for login
      auth.loginAsUser();
    }else{

      //code for signup
      let response
      try{
        response = await fetch('http://localhost:5000/api/users/signup',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            employeeNum : formState.inputs.employeeNum.value,
            firstName : formState.inputs.firstName.value,
            lastName : formState.inputs.lastName.value,
            email : formState.inputs.email.value,
            password : formState.inputs.password.value
          })
        });
      }catch(err){
        console.log(error);
      }
      const responseData = await response.json();
      //if error show error modal but if success show success modal
      if(responseData.error){
        if(responseData.error.message){
          console.log(responseData.error.message);
        }else{
          console.log(responseData.error);
        }
      }else if (responseData.success){
        console.log('sign up success');
      }
    }
  }

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
          <h2 className="login-mode-title">
            {isLoginMode ? "LOGIN TO YOUR ACCOUNT" : "CREATE YOUR ACCOUNT"}
          </h2>
          <form onSubmit={authSubmitHandler}>
            <div className="employeeNo-container">
              {!isLoginMode && (
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
                {!isLoginMode && (
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
                {!isLoginMode && (
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
              </div>
            </div>
            {/* <Button type="submit">
              {isLoginMode ? "Test Log in User" : "Register"}
            </Button> */}
            <Button type = "submit">
              {isLoginMode ? "Test Log in User" : "Register"}
            </Button>
            {isLoginMode && (
              <Button onClick={testLoginAdmin}>Test Log in Admin</Button>
            )}
          </form>

          {isLoginMode ? (
            <h6>
              Don't have an account?{" "}
              <a onClick={switchModeHandler}>Create an account here</a>
              <h6>
                Forgot your password?{" "}
                <a onClick={switchModeHandler}>Reset your password here</a>
              </h6>
            </h6>
          ) : (
            <h6>
              Already have an account?{" "}
              <a onClick={switchModeHandler}>Login here</a>
            </h6>
          )}

          {/* <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? "Sign Up" : "Log in"}
          </Button> */}
        </div>
      </div>
    </Card>
  );
};

export default Auth;
