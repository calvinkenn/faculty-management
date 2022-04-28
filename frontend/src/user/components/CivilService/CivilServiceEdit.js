import React from "react";
import Button from "../../../shared/components/FormElements/Button";

import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const CivilServiceEdit = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess} = useHttpClient();
  const today = new Date()
  const raw_month = today.getMonth() + 1;
  const year = today.getFullYear();
  const raw_day = today.getDate();
  let day ,month;
  if (raw_month < 10){
    month = "0"+raw_month.toString();
  }else{
    month =raw_month.toString();
  }
  if(raw_day < 10){
    day = "0" +raw_day.toString();
  }else{
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
        isValid: false,
      },
      rating: {
        value: props.editData ? props.editData.rating : "",
        isValid: false,
      },
      date: {
        value: props.editData ? formatDate(props.editData.date.substring(0, 10)) : now,
        isValid: false,
      },
      placeOfExam: {
        value: props.editData ? props.editData.placeOfExam : "",
        isValid: false,
      },
      licenseNumber: {
        value: props.editData ? props.editData.licenseNumber : "",
        isValid: false,
      },
      licenseValidity: {
        value: props.editData ? formatDate(props.editData.licenseValidity.substring(0, 10)) : now,
        isValid: false,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    event.preventDefault();

    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addUserCivil",
        "POST",
        
        JSON.stringify({
          career : formState.inputs.career.value,
          rating : formState.inputs.rating.value,
          date  : formState.inputs.date.value,
          placeOfExam : formState.inputs.placeOfExam.value,
          licenseNumber : formState.inputs.licenseNumber.value,
          licenseValidity : formState.inputs.licenseValidity.value,
          userId: storedData.userId,
          token: storedData.token
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.userCivil, responseData.message);
    props.updateAddModeState();
  };

  const submitEditHandler = async (event) => {
    //For Editing Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/editCivil",
        "PATCH",
        
        JSON.stringify({
          career : formState.inputs.career.value,
          rating : formState.inputs.rating.value,
          date  : formState.inputs.date.value,
          placeOfExam : formState.inputs.placeOfExam.value,
          licenseNumber : formState.inputs.licenseNumber.value,
          licenseValidity : formState.inputs.licenseValidity.value,
          userId: storedData.userId,
          civilId : props.editData._id,
          token: storedData.token
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.userCivil, responseData.message);
    props.updateAddModeState();
  };

  return (
    <React.Fragment>
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <Input
          element="input"
          id="career"
          type="text"
          label="Career"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.career.value}
          initialValid={formState.inputs.career.isValid}
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
          label = "Date of Examination"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.date.value}
          initialValid={formState.inputs.date.isValid}
        />
        <Input
          element="input"
          id="placeOfExam"
          type="text"
          label="Place of Examination"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.placeOfExam.value}
          initialValid={formState.inputs.placeOfExam.isValid}
        />
        <Input
          element="input"
          id="licenseNumber"
          type="text"
          label="License Number"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.licenseNumber.value}
          initialValid={formState.inputs.licenseNumber.isValid}
        />
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
        />
        <Button inverse type="submit">
          {props.addingItem ? "Add" : "Save"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CivilServiceEdit;
