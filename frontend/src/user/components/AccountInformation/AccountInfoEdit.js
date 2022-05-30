import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from '@mui/icons-material/Email';
import NumbersIcon from '@mui/icons-material/Numbers';

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EMPLOYEENUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

//mikko is here
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
//end

const AccountInfoEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [value, setValue] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      employeeNum: {
        value: props.userEdit.employeeNum
          .toString()
          .match(/\d{4}|\d+/g)
          .join("-"),
        isValid: props.userEdit.employeeNum ? true : false,
      },
      faculty: {
        value: props.userEdit.faculty,
        isValid: true,
      },
      employmentType: {
        value: props.userEdit.employmentType,
        isValid: true,
      },
      email: {
        value: props.userEdit.email,
        isValid: props.userEdit.email ? true : false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editAccountInfo", //Change to account
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          employeeNum: formState.inputs.employeeNum.value
            .toString()
            .replace(/-/g, ""),
          faculty: formState.inputs.faculty.value,
          employmentType: formState.inputs.employmentType.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const ALPHA_NUMERIC_DASH_REGEX = /^[0-9-\b]+$/;

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <div className="account-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <ManageAccountsIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Account Information</h1>
            </div>
          </div>
          <div className="acc-details-edit">
            <div className="acc-input-edit">
              <DatePicker
                views={["year"]}
                label="Year only"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
              <br />
              <div className="employee-num-cont">
                <Input
                  element="input"
                  id="employeeNum"
                  type="text"
                  label="Employee Number/Format-(0000-0)"
                  onKeyDown={(event) => {
                    if (event.keyCode !== 8) {
                      if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                        event.preventDefault();
                      }
                    }
                  }}
                  validators={[VALIDATOR_EMPLOYEENUMBER()]}
                  helperText="Please input a valid employee number."
                  onInput={inputHandler}
                  initialValue={formState.inputs.employeeNum.value}
                  initialValid={formState.inputs.employeeNum.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment position="start">
                          <NumbersIcon sx={{fontSize: '20px'}}/>
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
              </div>
              <div className="faculty-type-cont">
                <Input
                  element="select"
                  id="faculty"
                  type="text"
                  label="Department"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={["BSIT", "BLIS", "ALLIED"]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.faculty.value}
                  initialValid={formState.inputs.faculty.isValid}
                />
              </div>
              <div className="employment-type-cont">
                <Input
                  element="select"
                  id="employmentType"
                  type="text"
                  label="Employment Type"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={["Full Time", "Part Time"]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.employmentType.value}
                  initialValid={formState.inputs.employmentType.isValid}
                />
              </div>
              <div className="email-edit-cont">
                <Input
                  element="input"
                  id="email"
                  type="text"
                  label="Email"
                  validators={[VALIDATOR_EMAIL()]}
                  helperText="Please input valid email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.email.value}
                  initialValid={formState.inputs.email.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment position="start">
                          <EmailIcon sx={{fontSize: '20px'}} />
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="acc-edit-btn">
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

export default AccountInfoEdit;
