import React from "react";
import Button from "../../../shared/components/FormElements/Button";

import Input from "../../../shared/components/FormElements/Input";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
const TrainingEdit = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess} = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: props.editData ? props.editData.title : "",
        isValid: false,
      },
      type: {
        value: props.editData ? props.editData.type : "",
        isValid: false,
      },
      fromDate: {
        value: props.editData ? props.editData.fromDate : "",
        isValid: false,
      },
      toDate: {
        value: props.editData ? props.editData.toDate :"",
        isValid: false,
      },
      hours: {
        value: props.editData ? props.editData.hours :"",
        isValid: false,
      },
      typeOfLearning: {
        value: props.editData ? props.editData.typeOfLearning :"",
        isValid: false,
      },
      conducted: {
        value: props.editData ? props.editData.conducted :"",
        isValid: false,
      },
      certificatePic: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    //For Adding Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addUserTraining",
        "POST",
        JSON.stringify({
          title : formState.inputs.title.value,
          type : formState.inputs.type.value,
          fromDate: formState.inputs.fromDate.value,
          toDate: formState.inputs.toDate.value,
          hours: formState.inputs.hours.value,
          typeOfLearning : formState.inputs.typeOfLearning.value,
          conducted : formState.inputs.conducted.value,
          userId: storedData.userId,
          token: storedData.token
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.userTraining, responseData.message);
    props.updateAddModeState();
  };

  const submitEditHandler =  async (event) => {
    event.preventDefault();

    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/editUserTraining",
        "PATCH",
        
        JSON.stringify({
          title : formState.inputs.title.value,
          type : formState.inputs.type.value,
          fromDate: formState.inputs.fromDate.value,
          toDate: formState.inputs.toDate.value,
          hours: formState.inputs.hours.value,
          typeOfLearning : formState.inputs.typeOfLearning.value,
          conducted : formState.inputs.conducted.value,
          userId: storedData.userId,
          token: storedData.token,
          trainingId : props.editData._id,
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.userTraining, responseData.message);
    props.updateAddModeState();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <ImageUpload
          center
          id="certificatePic"
          // onInput={inputHandler}
          // previewUrl={props.userEdit.certificatePic}
        />
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          element="input"
          id="type"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.type.value}
          initialValid={formState.inputs.type.isValid}
        />
        <Input
          element="input"
          id="fromDate"
          type="text"
          label="From"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.fromDate.value}
          initialValid={formState.inputs.fromDate.isValid}
        />
        <Input
          element="input"
          id="toDate"
          type="text"
          label="To"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.toDate.value}
          initialValid={formState.inputs.toDate.isValid}
        />
        <Input
          element="input"
          id="hours"
          type="text"
          label="No. of Hours"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.hours.value}
          initialValid={formState.inputs.hours.isValid}
        />
        <Input
          element="input"
          id="typeOfLearning"
          type="text"
          label="Type of Learning"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.typeOfLearning.value}
          initialValid={formState.inputs.typeOfLearning.isValid}
        />
        <Input
          element="input"
          id="conducted"
          type="text"
          label="Conducted/Sponsored"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.conducted.value}
          initialValid={formState.inputs.conducted.isValid}
        />
        <Button inverse type="submit">
          {props.addingItem ? "Add" : "Save"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default TrainingEdit;
