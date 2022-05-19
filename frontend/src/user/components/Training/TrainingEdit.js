import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

//Mikko is here
import ArticleIcon from "@mui/icons-material/Article";
//

const TrainingEdit = (props) => {
  const [inputError, setInputError] = useState();
  const [fromDateVal, setFromDateVal] = useState(new Date());
  const [toDateVal, setToDateVal] = useState(new Date());
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: props.editData ? props.editData.title : "",
        isValid: props.editData && props.editData.title ? true : false,
      },
      type: {
        value: props.editData ? props.editData.type : "",
        isValid: props.editData && props.editData.type ? true : false,
      },
      hours: {
        value: props.editData ? props.editData.hours : "",
        isValid: props.editData && props.editData.hours ? true : false,
      },
      typeOfLearning: {
        value: props.editData ? props.editData.typeOfLearning : "",
        isValid: props.editData && props.editData.typeOfLearning ? true : false,
      },
      conducted: {
        value: props.editData ? props.editData.conducted : "",
        isValid: props.editData && props.editData.conducted ? true : false,
      },
      certificatePic: {
        value: props.editData ? props.editData.certificatePic : null,
        isValid: props.editData && props.editData.certificatePic ? true : false,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    //For Adding Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (!formState.inputs.certificatePic.value) {
      setInputError("Please upload photo");
      return;
    }

    if (fromDateVal.getFullYear() > toDateVal.getFullYear()) {
      setInputError("Please input a valid time period. From - To period");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("title", formState.inputs.title.value);
      formData.append("type", formState.inputs.type.value);
      formData.append(
        "fromDate",
        fromDateVal instanceof Date ? fromDateVal.getFullYear() : fromDateVal
      );
      formData.append(
        "toDate",
        toDateVal instanceof Date ? toDateVal.getFullYear() : toDateVal
      );
      formData.append("hours", formState.inputs.hours.value);
      formData.append("typeOfLearning", formState.inputs.typeOfLearning.value);
      formData.append("conducted", formState.inputs.conducted.value);
      formData.append("certificatePic", formState.inputs.certificatePic.value);

      const responseData = await sendRequest(
        "http://localhost:5000/api/users/addUserTraining",
        "POST",
        formData
        // JSON.stringify({
        //   title: formState.inputs.title.value,
        //   type: formState.inputs.type.value,
        //   fromDate: formState.inputs.fromDate.value,
        //   toDate: formState.inputs.toDate.value,
        //   hours: formState.inputs.hours.value,
        //   typeOfLearning: formState.inputs.typeOfLearning.value,
        //   conducted: formState.inputs.conducted.value,
        //   userId: storedData.userId,
        //   token: storedData.token,
        // }),
        // { "Content-Type": "application/json" }
      );
      props.setUserData(responseData.userTraining, responseData.message);
      // props.updateAddModeState();
    } catch (err) {}
  };

  const submitEditHandler = async (event) => {
    event.preventDefault();

    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (!formState.inputs.certificatePic.value) {
      setInputError("Please upload photo");
      return;
    }

    let fromChecker = fromDateVal;
    let toChecker = toDateVal;
    if (fromDateVal instanceof Date) {
      fromChecker = fromDateVal.getFullYear();
    }
    if (toDateVal instanceof Date) {
      toChecker = toDateVal.getFullYear();
    }
    if (fromChecker > toChecker) {
      setInputError(
        "Please input a valid time period. Year started to Year ended"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("title", formState.inputs.title.value);
      formData.append("type", formState.inputs.type.value);
      formData.append(
        "fromDate",
        fromDateVal instanceof Date ? fromDateVal.getFullYear() : fromDateVal
      );
      formData.append(
        "toDate",
        toDateVal instanceof Date ? toDateVal.getFullYear() : toDateVal
      );
      formData.append("hours", formState.inputs.hours.value);
      formData.append("typeOfLearning", formState.inputs.typeOfLearning.value);
      formData.append("conducted", formState.inputs.conducted.value);
      formData.append("certificatePic", formState.inputs.certificatePic.value);
      formData.append("trainingId", props.editData._id);

      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editUserTraining",
        "PATCH",
        formData
      );
      props.setUserData(responseData.userTraining, responseData.message);
      // props.updateAddModeState();
    } catch (err) {}
  };

  const clearInputError = () => {
    setInputError("");
  };

  useEffect(() => {
    if (props.editData) {
      setFromDateVal(props.editData.fromDate);
      setToDateVal(props.editData.toDate);
    }
  }, []);

  return (
    <React.Fragment>
      <ErrorModal
        error={inputError ? inputError : error}
        onClear={inputError ? clearInputError : clearError}
      />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <div className="training-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <ArticleIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">Training and Seminar</h1>
            </div>
          </div>
          <div className="trainings-add-cont">
            <div className="training-cert-upload-cont">
              <ImageUpload
                center
                id="certificatePic"
                onInput={inputHandler}
                previewUrl={
                  props.editData
                    ? props.editData.certificatePic
                    : formState.inputs.certificatePic.value
                }
                isEditMode={!props.addingItem}
              />
            </div>
            <div className="training-add-details-cont">
              <div className="title-type">
                <div className="training-title">
                  <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    helperText="Please input the title"
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialValid={formState.inputs.title.isValid}
                    required
                  />
                </div>
                <div className="training-type">
                  <Input
                    element="input"
                    id="type"
                    type="text"
                    label="Location"
                    validators={[VALIDATOR_REQUIRE()]}
                    helperText="Please input the location of the training/seminar"
                    onInput={inputHandler}
                    initialValue={formState.inputs.type.value}
                    initialValid={formState.inputs.type.isValid}
                    required
                  />
                </div>
              </div>
              <div className="training-time-hrs">
                <DatePicker
                  views={["year"]}
                  label="Select Year Started"
                  value={fromDateVal}
                  onChange={(newValue) => {
                    setFromDateVal(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required helperText={null} />
                  )}
                />
                <span />
                <DatePicker
                  views={["year"]}
                  label="Select Year Ended"
                  value={toDateVal}
                  onChange={(newValue) => {
                    setToDateVal(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required helperText={null} />
                  )}
                />
                <span />
                <Input
                  element="input"
                  id="hours"
                  type="number"
                  label="No. of Hours"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input the number of hours to complete"
                  onInput={inputHandler}
                  initialValue={formState.inputs.hours.value}
                  initialValid={formState.inputs.hours.isValid}
                  required
                />
              </div>
              <div className="type-conduct">
                <Input
                  element="select"
                  id="typeOfLearning"
                  type="text"
                  label="Type of Learning"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input the type of learning"
                  onInput={inputHandler}
                  initialValue={formState.inputs.typeOfLearning.value}
                  initialValid={formState.inputs.typeOfLearning.isValid}
                  required
                  items={[
                    "Culture",
                    "Geography",
                    "Health",
                    "History",
                    "Human activities",
                    "Mathematics",
                    "Nature",
                    "People",
                    "Philosophy",
                    "Religion",
                    "Society",
                    "Technology",
                  ]}
                />
                <span />
                <Input
                  element="input"
                  id="conducted"
                  type="text"
                  label="Conducted/Sponsored"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input who conducted/sponsored"
                  onInput={inputHandler}
                  initialValue={formState.inputs.conducted.value}
                  initialValid={formState.inputs.conducted.isValid}
                  required
                />
              </div>
            </div>
          </div>
          <div className="add-training-btn">
            <Button inverse type="submit">
              {props.addingItem ? "Add" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default TrainingEdit;
