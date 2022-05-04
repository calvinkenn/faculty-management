import React, { useState } from "react";
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
const TrainingEdit = (props) => {
  const [imageError, setImageError] = useState();
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
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
        value: props.editData ? props.editData.toDate : "",
        isValid: false,
      },
      hours: {
        value: props.editData ? props.editData.hours : "",
        isValid: false,
      },
      typeOfLearning: {
        value: props.editData ? props.editData.typeOfLearning : "",
        isValid: false,
      },
      conducted: {
        value: props.editData ? props.editData.conducted : "",
        isValid: false,
      },
      certificatePic: {
        value: props.editData ? props.editData.certificatePic : null,
        isValid: false,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    //For Adding Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (!formState.inputs.certificatePic.value) {
      setImageError("Please upload photo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("title", formState.inputs.title.value);
      formData.append("type", formState.inputs.type.value);
      formData.append("fromDate", formState.inputs.fromDate.value);
      formData.append("toDate", formState.inputs.toDate.value);
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
      setImageError("Please upload photo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("title", formState.inputs.title.value);
      formData.append("type", formState.inputs.type.value);
      formData.append("fromDate", formState.inputs.fromDate.value);
      formData.append("toDate", formState.inputs.toDate.value);
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

  const clearImageError = () => {
    setImageError("");
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={imageError ? imageError : error}
        onClear={imageError ? clearImageError : clearError}
      />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
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
        <Input
          element="input"
          id="type"
          type="text"
          label="Type"
          validators={[VALIDATOR_REQUIRE()]}
          helperText="Please input the type"
          onInput={inputHandler}
          initialValue={formState.inputs.type.value}
          initialValid={formState.inputs.type.isValid}
          required
        />
        <Input
          element="input"
          id="fromDate"
          type="number"
          label="From - year"
          validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
          helperText="Please input valid year"
          onInput={inputHandler}
          initialValue={formState.inputs.fromDate.value}
          initialValid={formState.inputs.fromDate.isValid}
          required
        />
        <Input
          element="input"
          id="toDate"
          type="number"
          label="To - year"
          validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
          helperText="Please input valid year"
          onInput={inputHandler}
          initialValue={formState.inputs.toDate.value}
          initialValid={formState.inputs.toDate.isValid}
          required
        />
        <Input
          element="input"
          id="hours"
          type="text"
          label="No. of Hours"
          validators={[VALIDATOR_REQUIRE()]}
          helperText="Please input the number of hours to complete"
          onInput={inputHandler}
          initialValue={formState.inputs.hours.value}
          initialValid={formState.inputs.hours.isValid}
          required
        />
        <Input
          element="input"
          id="typeOfLearning"
          type="text"
          label="Type of Learning"
          validators={[VALIDATOR_REQUIRE()]}
          helperText="Please input the type of learning"
          onInput={inputHandler}
          initialValue={formState.inputs.typeOfLearning.value}
          initialValid={formState.inputs.typeOfLearning.isValid}
          required
        />
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
        <Button inverse type="submit">
          {props.addingItem ? "Add" : "Save"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default TrainingEdit;
