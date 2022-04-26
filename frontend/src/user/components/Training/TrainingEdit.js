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

const TrainingEdit = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      fromDate: {
        value: "",
        isValid: false,
      },
      toDate: {
        value: "",
        isValid: false,
      },
      hours: {
        value: "",
        isValid: false,
      },
      typeOfLearning: {
        value: "",
        isValid: false,
      },
      conducted: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitAddHandler = (event) => {
    //For Adding Data
    console.log("clicked");
    event.preventDefault();
  };

  const submitEditHandler = (event) => {
    //For Editing Data
    console.log("clicked");
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
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
