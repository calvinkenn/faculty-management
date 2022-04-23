import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";

const ContactInfoEdit = (props) => {
  const { error, sendRequest } = useHttpClient();
  const [isSameAddress, setIsSameAddress] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      houseNoR: {
        value: props.userEdit.houseNoR,
        isValid: false,
      },
      streetR: {
        value: props.userEdit.streetR,
        isValid: false,
      },
      locationTypeR: {
        value: props.userEdit.locationTypeR,
        isValid: false,
      },
      barangayR: {
        value: props.userEdit.barangayR,
        isValid: false,
      },
      cityR: {
        value: props.userEdit.cityR,
        isValid: false,
      },
      provinceR: {
        value: props.userEdit.provinceR,
        isValid: false,
      },
      zipR: {
        value: props.userEdit.zipR,
        isValid: false,
      },

      houseNoP: {
        value: props.userEdit.houseNoP,
        isValid: false,
      },
      streetP: {
        value: props.userEdit.streetP,
        isValid: false,
      },
      locationTypeP: {
        value: props.userEdit.locationTypeP,
        isValid: false,
      },
      barangayP: {
        value: props.userEdit.barangayP,
        isValid: false,
      },
      cityP: {
        value: props.userEdit.cityP,
        isValid: false,
      },
      provinceP: {
        value: props.userEdit.provinceP,
        isValid: false,
      },
      zipP: {
        value: props.userEdit.zipP,
        isValid: false,
      },

      telephoneNum: {
        value: props.userEdit.telephoneNum,
        isValid: false,
      },
      cellphoneNum: {
        value: props.userEdit.cellphoneNum,
        isValid: false,
      },
      alternateEmail: {
        value: props.userEdit.alternateEmail,
        isValid: false,
      },
    },
    false
  );

  const sameAsResidentHandler = (event) => {
    setIsSameAddress(event.target.checked);
  };

  const submitHandler = async (event) => {
    console.log("clicked");
    console.log(formState.inputs.houseNoR.value);
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editContactInfo",
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          houseNoR: formState.inputs.houseNoR.value,
          streetR: formState.inputs.streetR.value,
          locationTypeR: formState.inputs.locationTypeR.value,
          barangayR: formState.inputs.barangayR.value,
          provinceR: formState.inputs.provinceR.value,
          zipR: formState.inputs.zipR.value,
          houseNoP: !isSameAddress //Copy value from Resident address if checked
            ? formState.inputs.houseNoP.value
            : formState.inputs.houseNoR.value,
          streetP: !isSameAddress
            ? formState.inputs.streetP.value
            : formState.inputs.streetR.value,
          locationTypeP: !isSameAddress
            ? formState.inputs.locationTypeP.value
            : formState.inputs.locationTypeR.value,
          barangayP: !isSameAddress
            ? formState.inputs.barangayP.value
            : formState.inputs.barangayR.value,
          provinceP: !isSameAddress
            ? formState.inputs.provinceP.value
            : formState.inputs.provinceR.value,
          zipP: !isSameAddress
            ? formState.inputs.zipP.value
            : formState.inputs.zipR.value,
          telephoneNum: formState.inputs.telephoneNum.value,
          cellphoneNum: formState.inputs.cellphoneNum.value,
          alternateEmail: formState.inputs.alternateEmail.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        Resident Address
        <Input
          element="input"
          id="houseNoR"
          type="text"
          label="House no."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.houseNoR.value}
          initialValid={formState.inputs.houseNoR.isValid}
        />
        <Input
          element="input"
          id="streetR"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.streetR.value}
          initialValid={formState.inputs.streetR.isValid}
        />
        <Input
          element="input"
          id="locationTypeR"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.locationTypeR.value}
          initialValid={formState.inputs.locationTypeR.isValid}
        />
        <Input
          element="select"
          id="barangayR"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          items={["Test1", "Test2"]}
          onInput={inputHandler}
          initialValue={formState.inputs.barangayR.value}
          initialValid={formState.inputs.barangayR.isValid}
        />
        <Input
          element="input"
          id="provinceR"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.provinceR.value}
          initialValid={formState.inputs.provinceR.isValid}
        />
        <Input
          element="input"
          id="zipR"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.zipR.value}
          initialValid={formState.inputs.zipR.isValid}
        />
        <br />
        Permanent Address
        <FormControlLabel
          label="Same as Resident"
          control={
            <Checkbox
              checked={isSameAddress}
              onChange={sameAsResidentHandler}
            />
          }
        />
        <br />
        <Input
          element="input"
          id="houseNoP"
          type="text"
          label="House no."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.houseNoP.value}
          initialValid={formState.inputs.houseNoP.isValid}
          disabled={isSameAddress}
        />
        <Input
          element="input"
          id="streetP"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.streetP.value}
          initialValid={formState.inputs.streetP.isValid}
          disabled={isSameAddress}
        />
        <Input
          element="input"
          id="locationTypeP"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.locationTypeP.value}
          initialValid={formState.inputs.locationTypeP.isValid}
          disabled={isSameAddress}
        />
        <Input
          element="input"
          id="barangayP"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.barangayP.value}
          initialValid={formState.inputs.barangayP.isValid}
          disabled={isSameAddress}
        />
        <Input
          element="input"
          id="provinceP"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.provinceP.value}
          initialValid={formState.inputs.provinceP.isValid}
          disabled={isSameAddress}
        />
        <Input
          element="input"
          id="zipP"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.zipP.value}
          initialValid={formState.inputs.zipP.isValid}
          disabled={isSameAddress}
        />
        <br />
        Addtl Info
        <Input
          element="input"
          id="telephoneNum"
          type="text"
          label="Telephone No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.telephoneNum.value}
          initialValid={formState.inputs.telephoneNum.isValid}
        />
        <Input
          element="input"
          id="cellphoneNum"
          type="text"
          label="Cellphone No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.cellphoneNum.value}
          initialValid={formState.inputs.cellphoneNum.isValid}
        />
        <Input
          element="input"
          id="alternateEmail"
          type="text"
          label="Alternate Email Address"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.alternateEmail.value}
          initialValid={formState.inputs.alternateEmail.isValid}
        />
        <Button inverse type="submit">
          Save
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ContactInfoEdit;
