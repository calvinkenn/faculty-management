import React, { useContext } from "react";

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
import Modal from "../../shared/components/UIElements/Modal";
import "./AdminAuth.css";

import bulsuLogo from "../../assets/Image/bulsu.png";
import cictLogo from "../../assets/Image/cict.png";
import cictBuilding from "../../assets/Image/pimentel.png";

const AdminAuth = (props) => {
  const auth = useContext(AuthContext);
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
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    //checks if the state is in login mode
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.loginAsAdmin(responseData.adminId, responseData.token);
    } catch (err) {}
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
              <h2 className="login-mode-title">Admin Login</h2>
              <form onSubmit={authSubmitHandler}>
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
                    <Input
                      element="input"
                      id="password"
                      type="password"
                      validators={[VALIDATOR_MINLENGTH(8)]}
                      helperText="Please input a minimum of 8 characters."
                      onInput={inputHandler}
                      label="Password"
                      variant="outlined"
                    />
                  </div>
                </div>
                <Button type="submit">Login</Button>
              </form>
            </div>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AdminAuth;
