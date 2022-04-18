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
      <h2>{isLoginMode ? "Log in" : "Register"}</h2>
      <hr />
      <form>
        {!isLoginMode && (
          <Input
            element="input"
            id="employeeNum"
            type="text"
            label="Employee Number"
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
            label="First Name"
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
            label="Last Name"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Invalid Email"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="text"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
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
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "Sign Up" : "Log in"}
      </Button>
    </Card>
  );
};

export default Auth;
