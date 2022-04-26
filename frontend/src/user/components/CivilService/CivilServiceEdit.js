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

const CivilServiceEdit = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      career: {
        value: "",
        isValid: false,
      },
      rating: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      placeOfExam: {
        value: "",
        isValid: false,
      },
      licenseNumber: {
        value: "",
        isValid: false,
      },
      licenseValidity: {
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
          type="text"
          label="Date"
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
          type="text"
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
