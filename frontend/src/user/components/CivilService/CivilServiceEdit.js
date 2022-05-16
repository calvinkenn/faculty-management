import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

//mikko is here
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
//end

const CivilServiceEdit = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [hasLicense, setHasLicense] = useState();
  const [errorData, setErrorData] = useState("");

  const today = new Date();
  const raw_month = today.getMonth() + 1;
  const year = today.getFullYear();
  const raw_day = today.getDate();
  let day, month;
  if (raw_month < 10) {
    month = "0" + raw_month.toString();
  } else {
    month = raw_month.toString();
  }
  if (raw_day < 10) {
    day = "0" + raw_day.toString();
  } else {
    day = raw_day.toString();
  }
  const formatDate = (input) => {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0, 4),
      month = datePart[1],
      day = datePart[2];

    return year + "-" + month + "-" + day;
  };
  const now = year + "-" + month + "-" + day;
  const [formState, inputHandler, setFormData] = useForm(
    {
      career: {
        value: props.editData ? props.editData.career : "",
        isValid: props.editData && props.editData.career ? true : false,
      },
      rating: {
        value: props.editData ? props.editData.rating : "",
        isValid: true,
      },
      date: {
        value: props.editData
          ? formatDate(props.editData.date.substring(0, 10))
          : now,
        isValid: props.editData && props.editData.date ? true : false,
      },
      placeOfExam: {
        value: props.editData ? props.editData.placeOfExam : "",
        isValid: props.editData && props.editData.placeOfExam ? true : false,
      },
      licenseNumber: {
        value: props.editData ? props.editData.licenseNumber : "",
        isValid: true,
      },
      licenseValidity: {
        value:
          props.editData && props.editData.licenseValidity !== null
            ? formatDate(props.editData.licenseValidity.substring(0, 10))
            : null,
        isValid: true,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    event.preventDefault();

    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (formState.inputs.licenseValidity.value < formState.inputs.date.value) {
      setErrorData("Invalid License Validity");
      return;
    }

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addUserCivil",
      "POST",

      JSON.stringify({
        career: formState.inputs.career.value,
        rating: formState.inputs.rating.value,
        date: formState.inputs.date.value,
        placeOfExam: formState.inputs.placeOfExam.value,
        licenseNumber: formState.inputs.licenseNumber.value,
        licenseValidity: formState.inputs.licenseValidity.value,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userCivil, responseData.message);
  };

  const submitEditHandler = async (event) => {
    //For Editing Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (formState.inputs.licenseValidity.value < formState.inputs.date.value) {
      setErrorData("Invalid License Validity");
      return;
    }

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/editCivil",
      "PATCH",

      JSON.stringify({
        career: formState.inputs.career.value,
        rating: formState.inputs.rating.value,
        date: formState.inputs.date.value,
        placeOfExam: formState.inputs.placeOfExam.value,
        licenseNumber: formState.inputs.licenseNumber.value,
        licenseValidity: formState.inputs.licenseValidity.value,
        userId: storedData.userId,
        civilId: props.editData._id,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userCivil, responseData.message);
  };

  const hasLicenseHandler = (event) => {
    setHasLicense(event.target.checked);
  };

  const clearErrorData = () => {
    setErrorData("");
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={errorData ? errorData : error}
        onClear={errorData ? clearErrorData : clearError}
      />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <div className="civil-serv-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <FeaturedVideoIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">Licences</h1>
            </div>
          </div>
          <div className="civil-service-cont">
            <Input
              element="input"
              id="career"
              type="text"
              label="Career Service"
              validators={[VALIDATOR_REQUIRE()]}
              helperText="Please input the career service"
              onInput={inputHandler}
              initialValue={formState.inputs.career.value}
              initialValid={formState.inputs.career.isValid}
              required
            />
            <Input
              element="input"
              id="rating"
              type="text"
              label="Rating"
              validators={[VALIDATOR_OPTIONAL()]}
              errorText="Invalid Email"
              onInput={inputHandler}
              initialValue={formState.inputs.rating.value}
              initialValid={formState.inputs.rating.isValid}
            />
            <Input
              element="input"
              id="date"
              type="date"
              label="Date of Examination"
              validators={[VALIDATOR_REQUIRE()]}
              helperText="Please input the date of examination"
              onInput={inputHandler}
              initialValue={formState.inputs.date.value}
              initialValid={formState.inputs.date.isValid}
            />
            <Input
              element="input"
              id="placeOfExam"
              type="text"
              label="Place of Examination"
              validators={[VALIDATOR_REQUIRE()]}
              helperText="Please input the place of examination"
              onInput={inputHandler}
              initialValue={formState.inputs.placeOfExam.value}
              initialValid={formState.inputs.placeOfExam.isValid}
              required
            />
            {!props.addingItem && (
              <Input
                element="input"
                id="licenseNumber"
                type="number"
                label="License Number"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.licenseNumber.value}
                initialValid={formState.inputs.licenseNumber.isValid}
              />
            )}

            {!props.addingItem && (
              <Input
                element="input"
                id="licenseValidity"
                type="date"
                label="License Validity"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.licenseValidity.value}
                initialValid={formState.inputs.licenseValidity.isValid}
                inputProps={
                  formState.inputs.licenseValidity.value === "" && {
                    style: { color: "transparent" },
                  }
                }
              />
            )}

            {props.addingItem && (
              <FormControlLabel
                label="With License"
                control={
                  <Checkbox checked={hasLicense} onChange={hasLicenseHandler} />
                }
              />
            )}

            {hasLicense && (
              <Input
                element="input"
                id="licenseNumber"
                type="number"
                label="License Number"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.licenseNumber.value}
                initialValid={formState.inputs.licenseNumber.isValid}
              />
            )}
            {hasLicense && (
              <Input
                element="input"
                id="licenseValidity"
                type="date"
                label="License Validity"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.licenseValidity.value}
                initialValid={formState.inputs.licenseValidity.isValid}
                inputProps={
                  formState.inputs.licenseValidity.value === "" && {
                    style: { color: "transparent" },
                  }
                }
              />
            )}
          </div>
          <div className="civ-ser-btn">
            <Button inverse type="submit">
              {props.addingItem ? "Add" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CivilServiceEdit;
