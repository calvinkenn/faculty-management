import React, { useEffect } from "react";
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

const DUMMY_DATA = {
  //REPLACE WITH DATABASE
  userId: "333",
  employeeNumber: "223111",
  firstName: "TEST TITLE 1",
  middleName: "TEST TYPE 1",
  lastName: "2020 1",
  contact: "23213111",
  email: "TEST EMAIL",
  extensionName: "TEST EXTENSION",
  bday: "2022",
  age: "12",
  placeOfBirth: "TEST PLACE",
  gender: "Male",
  civilStatus: "Single",
  height: "4.5",
  weight: "25",
  bloodType: "AB",
  gssId: "TEST",
  pagibigId: "TEST",
  philHealthId: "TEST",
  sssNo: "TEST",
  tinNo: "TEST",
  citizenship: "TEST",
};

const BasicInfoEdit = (props) => {
  const { error, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: props.userEdit.firstName,
        isValid: true,
      },
      middleName: {
        value: props.userEdit.middleName,
        isValid: true,
      },
      lastName: {
        value: props.userEdit.lastName,
        isValid: true,
      },
      email: {
        value: props.userEdit.email,
        isValid: true,
      },
      extensionName: {
        value: DUMMY_DATA.extensionName,
        isValid: true,
      },
      bday: {
        value: props.userEdit.birthday.substring(0, 10),
        isValid: true,
      },
      placeofBirth: {
        value: DUMMY_DATA.placeofBirth,
        isValid: true,
      },
      gender: {
        value: props.userEdit.gender,
        isValid: true,
      },
      civilStatus: {
        value: props.userEdit.civilStatus,
        isValid: true,
      },
      height: {
        value: props.userEdit.height,
        isValid: true,
      },
      weight: {
        value: props.userEdit.weight,
        isValid: true,
      },
      bloodType: {
        value: props.userEdit.bloodType,
        isValid: true,
      },
      gssId: {
        value: props.userEdit.gssId,
        isValid: true,
      },
      pagibigId: {
        value: props.userEdit.pagibigId,
        isValid: true,
      },
      philHealthId: {
        value: props.userEdit.philHealthId,
        isValid: true,
      },
      sssNo: {
        value: props.userEdit.sssNo,
        isValid: true,
      },
      tinNo: {
        value: props.userEdit.tinNo,
        isValid: true,
      },
      citizenship: {
        value: props.userEdit.citizenship,
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/edit",
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          middleName: formState.inputs.middleName.value,
          birthday: formState.inputs.bday.value,
          placeofBirth: formState.inputs.placeofBirth.value,
          gender: formState.inputs.gender.value,
          civilStatus: formState.inputs.civilStatus.value,
          height: formState.inputs.height.value,
          weight: formState.inputs.weight.value,
          bloodType: formState.inputs.bloodType.value,
          gssId: formState.inputs.gssId.value,
          pagibigId: formState.inputs.pagibigId.value,
          philHealthId: formState.inputs.philHealthId.value,
          sssNo: formState.inputs.sssNo.value,
          tinNo: formState.inputs.tinNo.value,
          citizenship: formState.inputs.citizenship.value,
          // email : formState.inputs.email.value
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
        <Input
          element="input"
          id="firstName"
          type="text"
          label="First Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.firstName.value}
          initialValid={formState.inputs.firstName.isValid}
        />
        <Input
          element="input"
          id="middleName"
          type="text"
          label="Middle Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.middleName.value}
          initialValid={formState.inputs.middleName.isValid}
        />
        <Input
          element="input"
          id="lastName"
          type="text"
          label="Last Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.lastName.value}
          initialValid={formState.inputs.lastName.isValid}
        />
        <Input
          element="input"
          id="email"
          type="text"
          label="Email"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.email.value}
          initialValid={formState.inputs.email.isValid}
        />
        <Input
          element="input"
          id="eName"
          type="text"
          label="Extension Name"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.extensionName.value}
          initialValid={formState.inputs.extensionName.isValid}
        />
        <Input
          element="input"
          id="bday"
          type="date"
          label="Birthday"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.bday.value}
          initialValid={formState.inputs.bday.isValid}
        />
        <Input
          element="input"
          id="placeofBirth"
          type="text"
          label="Place of Birth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.placeofBirth.value}
          initialValid={formState.inputs.placeofBirth.isValid}
        />
        <Input
          element="input"
          id="gender"
          type="text"
          label="Gender"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.gender.value}
          initialValid={formState.inputs.gender.isValid}
        />
        <Input
          element="input"
          id="civilStatus"
          type="text"
          label="Civil Status"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.civilStatus.value}
          initialValid={formState.inputs.civilStatus.isValid}
        />
        <Input
          element="input"
          id="height"
          type="text"
          label="Height"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.height.value}
          initialValid={formState.inputs.height.isValid}
        />
        <Input
          element="input"
          id="weight"
          type="text"
          label="Weight"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.weight.value}
          initialValid={formState.inputs.weight.isValid}
        />
        <Input
          element="input"
          id="bloodType"
          type="text"
          label="Blood Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.bloodType.value}
          initialValid={formState.inputs.bloodType.isValid}
        />
        <Input
          element="input"
          id="gssId"
          type="text"
          label="GSS ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.gssId.value}
          initialValid={formState.inputs.gssId.isValid}
        />
        <Input
          element="input"
          id="pagibigId"
          type="text"
          label="Pagibig ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.pagibigId.value}
          initialValid={formState.inputs.pagibigId.isValid}
        />
        <Input
          element="input"
          id="philHealthId"
          type="text"
          label="Philhealth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.philHealthId.value}
          initialValid={formState.inputs.philHealthId.isValid}
        />
        <Input
          element="input"
          id="sssNo"
          type="text"
          label="SSS No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.sssNo.value}
          initialValid={formState.inputs.sssNo.isValid}
        />
        <Input
          element="input"
          id="tinNo"
          type="text"
          label="TIN No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.tinNo.value}
          initialValid={formState.inputs.tinNo.isValid}
        />
        <Input
          element="input"
          id="citizenship"
          type="text"
          label="Citizenship"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.citizenship.value}
          initialValid={formState.inputs.citizenship.isValid}
        />
        <Button inverse type="submit">
          Save Info
        </Button>
      </form>
    </React.Fragment>
  );
};

export default BasicInfoEdit;
