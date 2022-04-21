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
  gssID: "TEST",
  pagibigID: "TEST",
  philhealth: "TEST",
  sssNO: "TEST",
  tinNO: "TEST",
  citizenship: "TEST",
};

const BasicInfoEdit = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: props.userEdit.firstName,
        isValid: true,
      },
      middleName: {
        value: DUMMY_DATA.middleName,
        isValid: true,
      },
      lastName: {
        value: props.userEdit.lastName,
        isValid: true,
      },
      contact: {
        value: DUMMY_DATA.contact,
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
        value: DUMMY_DATA.bday,
        isValid: true,
      },
      placeOfBirth: {
        value: DUMMY_DATA.placeOfBirth,
        isValid: true,
      },
      gender: {
        value: DUMMY_DATA.gender,
        isValid: true,
      },
      civilStatus: {
        value: DUMMY_DATA.civilStatus,
        isValid: true,
      },
      height: {
        value: DUMMY_DATA.height,
        isValid: true,
      },
      weight: {
        value: DUMMY_DATA.weight,
        isValid: true,
      },
      bloodType: {
        value: DUMMY_DATA.bloodType,
        isValid: true,
      },
      gssID: {
        value: DUMMY_DATA.gssID,
        isValid: true,
      },
      pagibigID: {
        value: DUMMY_DATA.pagibigID,
        isValid: true,
      },
      philhealth: {
        value: DUMMY_DATA.philhealth,
        isValid: true,
      },
      sssNO: {
        value: DUMMY_DATA.sssNO,
        isValid: true,
      },
      tinNO: {
        value: DUMMY_DATA.tinNO,
        isValid: true,
      },
      citizenship: {
        value: DUMMY_DATA.citizenship,
        isValid: true,
      },

    },
    false
  );

  const basicInfoEditHandler = async (event) =>{
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem('userData'));
    const response = await fetch('http://localhost:5000/api/users/basicInfoEdit',{
        method : 'PATCH',
        headers : {'Content-Type' : 'application/json'},
        body  : JSON.stringify({
          userId : storedData.userId,
          token : storedData.token,
          firstName : formState.inputs.firstName.value,
          lastName : formState.inputs.lastName.value,
          email : formState.inputs.email.value
        })
      });
      const responseData = await response.json();
      console.log(responseData);
  }
  return (
    <React.Fragment>
      <form onSubmit ={basicInfoEditHandler}>
        <Input
          element="input"
          id="fName"
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
          id="mName"
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
          id="lName"
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
          id="contact"
          type="text"
          label="Contact"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.contact.value}
          initialValid={formState.inputs.contact.isValid}
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
          type="text"
          label="Birthday"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.bday.value}
          initialValid={formState.inputs.bday.isValid}
        />
        <Input
          element="input"
          id="placeOfBirth"
          type="text"
          label="Place of Birth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.placeOfBirth.value}
          initialValid={formState.inputs.placeOfBirth.isValid}
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
          id="gssID"
          type="text"
          label="GSS ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.gssID.value}
          initialValid={formState.inputs.gssID.isValid}
        />
        <Input
          element="input"
          id="pagibigID"
          type="text"
          label="Pagibig ID"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.pagibigID.value}
          initialValid={formState.inputs.pagibigID.isValid}
        />
        <Input
          element="input"
          id="philhealth"
          type="text"
          label="Philhealth"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.philhealth.value}
          initialValid={formState.inputs.philhealth.isValid}
        />
        <Input
          element="input"
          id="sssNo"
          type="text"
          label="SSS No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.sssNO.value}
          initialValid={formState.inputs.sssNO.isValid}
        />
        <Input
          element="input"
          id="tinNo"
          type="text"
          label="TIN No."
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.tinNO.value}
          initialValid={formState.inputs.tinNO.isValid}
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
        <Button inverse type = "submit">Save Info</Button>
      </form>
      
    </React.Fragment>
  );
};

export default BasicInfoEdit;
