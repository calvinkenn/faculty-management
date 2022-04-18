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
  residentAddress: {
    houseNo: "TEST",
    street: "TEST",
    locationType: "1",
    barangay: "TEST",
    city: "TEST",
    province: "TEST",
    zip: "TEST",
  },
  permanentAddress: {
    houseNo: "TEST2",
    street: "TEST2",
    locationType: "2",
    barangay: "TEST2",
    city: "TEST2",
    province: "TEST2",
    zip: "TEST2",
  },
  telephoneNum: "TEST",
  cellphoneNum: "TEST",
  alternateEmail: "TEST",
};

const ContactInfoEdit = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      residentAddress: {
        houseNo: {
          value: DUMMY_DATA.residentAddress.houseNo,
          isValid: false,
        },
        street: {
          value: DUMMY_DATA.residentAddress.street,
          isValid: false,
        },
        locationType: {
          value: DUMMY_DATA.residentAddress.locationType,
          isValid: false,
        },
        barangay: {
          value: DUMMY_DATA.residentAddress.barangay,
          isValid: false,
        },
        city: {
          value: DUMMY_DATA.residentAddress.city,
          isValid: false,
        },
        province: {
          value: DUMMY_DATA.residentAddress.province,
          isValid: false,
        },
        zip: {
          value: DUMMY_DATA.residentAddress.zip,
          isValid: false,
        },
      },
      permanentAddress: {
        houseNo: {
          value: DUMMY_DATA.permanentAddress.houseNo,
          isValid: false,
        },
        street: {
          value: DUMMY_DATA.permanentAddress.street,
          isValid: false,
        },
        locationType: {
          value: DUMMY_DATA.permanentAddress.locationType,
          isValid: false,
        },
        barangay: {
          value: DUMMY_DATA.permanentAddress.barangay,
          isValid: false,
        },
        city: {
          value: DUMMY_DATA.permanentAddress.city,
          isValid: false,
        },
        province: {
          value: DUMMY_DATA.permanentAddress.province,
          isValid: false,
        },
        zip: {
          value: DUMMY_DATA.permanentAddress.zip,
          isValid: false,
        },
      },
      telephoneNum: {
        value: DUMMY_DATA.telephoneNum,
        isValid: false,
      },
      cellphoneNum: {
        value: DUMMY_DATA.cellphoneNum,
        isValid: false,
      },
      alternateEmail: {
        value: DUMMY_DATA.alternateEmail,
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
          initialValue={formState.inputs.residentAddress.houseNo.value}
          initialValid={formState.inputs.residentAddress.houseNo.isValid}
        />
        <Input
          element="input"
          id="rStreet"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.residentAddress.street.value}
          initialValid={formState.inputs.residentAddress.street.isValid}
        />
        <Input
          element="input"
          id="rType"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.residentAddress.locationType.value}
          initialValid={formState.inputs.residentAddress.locationType.isValid}
        />
        <Input
          element="input"
          id="rBarangay"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.residentAddress.barangay.value}
          initialValid={formState.inputs.residentAddress.barangay.isValid}
        />
        <Input
          element="input"
          id="rProvince"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.residentAddress.province.value}
          initialValid={formState.inputs.residentAddress.province.isValid}
        />
        <Input
          element="input"
          id="rZip"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.residentAddress.zip.value}
          initialValid={formState.inputs.residentAddress.zip.isValid}
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
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
        />
        <Input
          element="input"
          id="pStreet"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
        />
        <Input
          element="input"
          id="pType"
          type="text"
          label="Type"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
        />
        <Input
          element="input"
          id="pBarangay"
          type="text"
          label="Barangay"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
        />
        <Input
          element="input"
          id="pProvince"
          type="text"
          label="Province"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
        />
        <Input
          element="input"
          id="pZip"
          type="text"
          label="Zip Code"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.permanentAddress.zip.value}
          initialValid={formState.inputs.permanentAddress.zip.isValid}
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
          initialValue={formState.inputs.telephoneNum.value}
          initialValid={formState.inputs.telephoneNum.isValid}
        />
        <Input
          element="input"
          id="cellNo"
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
      </form>
      <Button inverse>Save</Button>
    </React.Fragment>
  );
};

export default ContactInfoEdit;
