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

const ContactInfoEdit = (props) => {
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
        Resident Address
        <Input
          element="input"
          id="rHouseNo"
          type="text"
          label="House no."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="rStreet"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="rType"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="rBarangay"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="rProvince"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="rZip"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        Permanent Address
        <Input
          element="input"
          id="pHouseNo"
          type="text"
          label="House no."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pStreet"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pType"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pBarangay"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pProvince"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="pZip"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        Addtl Info
        <Input
          element="input"
          id="telNo"
          type="text"
          label="Telephone No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="cellNo"
          type="text"
          label="Cellphone No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="alternateEmail"
          type="text"
          label="Alternate Email Address"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
        />
      </form>
      <Button inverse>Save</Button>
    </React.Fragment>
  );
};

export default ContactInfoEdit;
