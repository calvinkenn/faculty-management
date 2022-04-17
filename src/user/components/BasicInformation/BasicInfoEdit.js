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

const BasicInfoEdit = (props) => {
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
  return (
    <React.Fragment>
      <form>
        <Input
          element="input"
          id="fName"
          type="text"
          label="First Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="mName"
          type="text"
          label="Middle Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="lName"
          type="text"
          label="Last Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="contact"
          type="text"
          label="Contact"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="email"
          type="text"
          label="Email"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="eName"
          type="text"
          label="Extension Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="bday"
          type="text"
          label="Birthday"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="age"
          type="text"
          label="Age"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="placeOfBirth"
          type="text"
          label="Place of Birth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="gender"
          type="text"
          label="Gender"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="civilStatus"
          type="text"
          label="Civil Status"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="height"
          type="text"
          label="Height"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="weight"
          type="text"
          label="Weight"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="bloodType"
          type="text"
          label="Blood Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="gssID"
          type="text"
          label="GSS ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pagibigID"
          type="text"
          label="Pagibig ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="philhealth"
          type="text"
          label="Philhealth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="sssNo"
          type="text"
          label="SSS No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="tinNo"
          type="text"
          label="TIN No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="citizenship"
          type="text"
          label="Citizenship"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
      </form>
      <Button inverse>Save</Button>
    </React.Fragment>
  );
};

export default BasicInfoEdit;
