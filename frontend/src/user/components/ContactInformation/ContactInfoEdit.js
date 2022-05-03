import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
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
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const ContactInfoEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [isSameAddress, setIsSameAddress] = useState(false);

  const [houseNoR, setHouseNoR] = useState("");
  const [streetR, setStreetR] = useState("");
  const [locationTypeR, setLocationTypeR] = useState("");
  const [zipR, setZipR] = useState("");

  const [houseNoP, setHouseNoP] = useState("");
  const [streetP, setStreetP] = useState("");
  const [locationTypeP, setLocationTypeP] = useState("");
  const [zipP, setZipP] = useState("");

  const [regionDataR, setRegionR] = useState([]);
  const [provinceDataR, setProvinceR] = useState([]);
  const [cityDataR, setCityR] = useState([]);
  const [barangayDataR, setBarangayR] = useState([]);

  const [regionDataP, setRegionP] = useState([]);
  const [provinceDataP, setProvinceP] = useState([]);
  const [cityDataP, setCityP] = useState([]);
  const [barangayDataP, setBarangayP] = useState([]);

  const [regionAddrR, setRegionAddrR] = useState("");
  const [provinceAddrR, setProvinceAddrR] = useState("");
  const [cityAddrR, setCityAddrR] = useState("");
  const [barangayAddrR, setBarangayAddrR] = useState("");

  const [regionAddrP, setRegionAddrP] = useState("");
  const [provinceAddrP, setProvinceAddrP] = useState("");
  const [cityAddrP, setCityAddrP] = useState("");
  const [barangayAddrP, setBarangayAddrP] = useState("");

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  useEffect(() => {
    //Set default Value
    setRegionAddrR(props.userEdit.regionR);
    setProvinceAddrR(props.userEdit.provinceR);
    setCityAddrR(props.userEdit.cityR);
    setBarangayAddrR(props.userEdit.barangayR);
    setRegionAddrP(props.userEdit.regionP);
    setProvinceAddrP(props.userEdit.provinceP);
    setCityAddrP(props.userEdit.cityP);
    setBarangayAddrP(props.userEdit.barangayP);
    //For resident address default
    provinces(props.userEdit.regionR).then((response) => {
      setProvinceR(response);
      setCityR([]);
      setBarangayR([]);
    });

    cities(props.userEdit.provinceR).then((response) => {
      setCityR(response);
    });

    barangays(props.userEdit.cityR).then((response) => {
      setBarangayR(response);
    });

    //For permanent address default
    provinces(props.userEdit.regionP).then((response) => {
      setProvinceP(response);
      setCityP([]);
      setBarangayP([]);
    });

    cities(props.userEdit.provinceP).then((response) => {
      setCityP(response);
    });

    barangays(props.userEdit.cityP).then((response) => {
      setBarangayP(response);
    });
  }, []);

  const regionR = () => {
    regions().then((response) => {
      setRegionR(response);
    });
  };

  const regionP = () => {
    regions().then((response) => {
      setRegionP(response);
    });
  };

  const provinceR = (e) => {
    setRegionAddrR(e.target.value);
    console.log(e.target.value);
    provinces(e.target.value).then((response) => {
      setProvinceR(response);
      setCityR([]);
      setBarangayR([]);

      if (isSameAddress) {
        setProvinceP(response);
        setCityP([]);
        setBarangayP([]);
      }
    });

    // if (isSameAddress) {
    //   setRegionAddrP(e.target.value);
    // }
  };

  const cityR = (e) => {
    setProvinceAddrR(e.target.value);
    cities(e.target.value).then((response) => {
      setCityR(response);

      if (isSameAddress) {
        setCityP(response);
      }
    });

    // if (isSameAddress) {
    //   setProvinceAddrP(e.target.value);
    // }
  };

  const barangayR = (e) => {
    setCityAddrR(e.target.value);
    barangays(e.target.value).then((response) => {
      setBarangayR(response);

      if (isSameAddress) {
        setBarangayP(response);
      }
    });

    // if (isSameAddress) {
    //   setCityAddrP(e.target.value);
    // }
  };

  const brgyR = (e) => {
    setBarangayAddrR(e.target.value);

    // if (isSameAddress) {
    //   setBarangayAddrP(e.target.value);
    // }
  };

  //Permanent
  const provinceP = (e) => {
    setRegionAddrP(e.target.value);
    console.log(e.target.value);
    provinces(e.target.value).then((response) => {
      setProvinceP(response);
      setCityP([]);
      setBarangayP([]);
    });
  };

  const cityP = (e) => {
    setProvinceAddrP(e.target.value);
    cities(e.target.value).then((response) => {
      setCityP(response);
    });
  };

  const barangayP = (e) => {
    setCityAddrP(e.target.value);
    barangays(e.target.value).then((response) => {
      setBarangayP(response);
    });
  };

  const brgyP = (e) => {
    setBarangayAddrP(e.target.value);
  };

  useEffect(() => {
    regionR();
    regionP();

    setHouseNoR(props.userEdit.houseNoR);
    setStreetR(props.userEdit.streetR);
    setLocationTypeR(props.userEdit.locationTypeR);
    setZipR(props.userEdit.zipR);

    setHouseNoP(props.userEdit.houseNoP);
    setStreetP(props.userEdit.streetP);
    setLocationTypeP(props.userEdit.locationTypeP);
    setZipP(props.userEdit.zipP);
  }, []);

  const sameAsResidentHandler = (event) => {
    setIsSameAddress(event.target.checked);

    if (event.target.checked) {
      setHouseNoP(houseNoR);
    }
    if (event.target.checked) {
      setStreetP(streetR);
    }
    if (event.target.checked) {
      setLocationTypeP(locationTypeR);
    }
    if (event.target.checked) {
      setZipP(zipR);
    }
  };

  //Setting Address value
  const houseNoRHandler = (e) => {
    setHouseNoR(e.target.value);

    if (isSameAddress) {
      setHouseNoP(e.target.value);
    }
  };

  const streetRHandler = (e) => {
    setStreetR(e.target.value);

    if (isSameAddress) {
      setStreetP(e.target.value);
    }
  };

  const locationTypeRHandler = (e) => {
    setLocationTypeR(e.target.value);

    if (isSameAddress) {
      setLocationTypeP(e.target.value);
    }
  };

  const zipRHandler = (e) => {
    setZipR(e.target.value);

    if (isSameAddress) {
      setZipP(e.target.value);
    }
  };

  // Permanent Address
  const houseNoPHandler = (e) => {
    setHouseNoP(e.target.value);
  };

  const streetPHandler = (e) => {
    setStreetP(e.target.value);
  };

  const locationTypePHandler = (e) => {
    setLocationTypeP(e.target.value);
  };

  const zipPHandler = (e) => {
    setZipP(e.target.value);
  };

  console.log("WE");

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editContactInfo",
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          houseNoR: houseNoR,
          streetR: streetR,
          locationTypeR: locationTypeR,
          regionR: regionAddrR,
          provinceR: provinceAddrR,
          cityR: cityAddrR,
          barangayR: barangayAddrR,
          zipR: zipR,
          houseNoP: houseNoP,
          streetP: streetP,
          locationTypeP: locationTypeP,
          regionP: !isSameAddress ? regionAddrP : regionAddrR,
          provinceP: !isSameAddress ? provinceAddrP : provinceAddrR,
          cityP: !isSameAddress ? cityAddrP : cityAddrR,
          barangayP: !isSameAddress ? barangayAddrP : barangayAddrR,
          zipP: zipP,
          telephoneNum: formState.inputs.telephoneNum.value,
          cellphoneNum: formState.inputs.cellphoneNum.value,
          alternateEmail: formState.inputs.alternateEmail.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={submitHandler}>
        Resident Address
        <TextField
          element="input"
          id="houseNoR"
          type="text"
          label="House no."
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={houseNoRHandler}
          value={houseNoR}
          // initialValue={formState.inputs.houseNoR.value}
          // initialValid={formState.inputs.houseNoR.isValid}
        />
        <TextField
          element="input"
          id="streetR"
          type="text"
          label="Street"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={streetRHandler}
          value={streetR}
          // initialValue={formState.inputs.streetR.value}
          // initialValid={formState.inputs.streetR.isValid}
        />
        <TextField
          element="input"
          id="locationTypeR"
          type="text"
          label="Subdivision/Village"
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={locationTypeRHandler}
          value={locationTypeR}
          // initialValue={formState.inputs.locationTypeR.value}
          // initialValid={formState.inputs.locationTypeR.isValid}
        />
        {/* RESIDENT ADDRESS  -------------------------------*/}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Region</InputLabel>
          <Select onChange={provinceR} onSelect={regionR} value={regionAddrR}>
            <MenuItem disabled>Select Region</MenuItem>
            {regionDataR &&
              regionDataR.length > 0 &&
              regionDataR.map((item) => (
                <MenuItem key={item.region_code} value={item.region_code}>
                  {item.region_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Province</InputLabel>
          <Select onChange={cityR} value={provinceAddrR}>
            <MenuItem disabled>Select Province</MenuItem>
            {provinceDataR &&
              provinceDataR.length > 0 &&
              provinceDataR.map((item) => (
                <MenuItem key={item.province_code} value={item.province_code}>
                  {item.province_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select City</InputLabel>
          <Select onChange={barangayR} value={cityAddrR}>
            <MenuItem disabled>Select City</MenuItem>
            {cityDataR &&
              cityDataR.length > 0 &&
              cityDataR.map((item) => (
                <MenuItem key={item.city_code} value={item.city_code}>
                  {item.city_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Barangay</InputLabel>
          <Select onChange={brgyR} value={barangayAddrR}>
            <MenuItem disabled>Select Barangay</MenuItem>
            {barangayDataR &&
              barangayDataR.length > 0 &&
              barangayDataR.map((item) => (
                <MenuItem key={item.brgy_code} value={item.brgy_code}>
                  {item.brgy_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* END OF RESIDENT ADDRESS  -------------------------------*/}
        <TextField
          element="input"
          id="zipR"
          type="text"
          label="Zip Code"
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={zipRHandler}
          value={zipR}
          // initialValue={formState.inputs.zipR.value}
          // initialValid={formState.inputs.zipR.isValid}
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
        <TextField
          element="input"
          id="houseNoP"
          type="text"
          label="House no."
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={houseNoPHandler}
          // initialValue={formState.inputs.houseNoP.value}
          // initialValid={formState.inputs.houseNoP.isValid}
          disabled={isSameAddress}
          value={houseNoP}
        />
        <TextField
          element="input"
          id="streetP"
          type="text"
          label="Street"
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={streetPHandler}
          // initialValue={formState.inputs.streetP.value}
          // initialValid={formState.inputs.streetP.isValid}
          disabled={isSameAddress}
          value={streetP}
        />
        <TextField
          element="input"
          id="locationTypeP"
          type="text"
          label="Subdivision/Village"
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onChange={locationTypePHandler}
          // initialValue={formState.inputs.locationTypeP.value}
          // initialValid={formState.inputs.locationTypeP.isValid}
          disabled={isSameAddress}
          value={locationTypeP}
        />
        {/* PERMANENT ADDRESS  -------------------------------*/}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Region</InputLabel>
          <Select
            onChange={provinceP}
            onSelect={regionP}
            value={!isSameAddress ? regionAddrP : regionAddrR}
            disabled={isSameAddress}
          >
            <MenuItem disabled>Select Region</MenuItem>
            {regionDataP &&
              regionDataP.length > 0 &&
              regionDataP.map((item) => (
                <MenuItem key={item.region_code} value={item.region_code}>
                  {item.region_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Province</InputLabel>
          <Select
            onChange={cityP}
            value={!isSameAddress ? provinceAddrP : provinceAddrR}
            disabled={isSameAddress}
          >
            <MenuItem disabled>Select Province</MenuItem>
            {provinceDataP &&
              provinceDataP.length > 0 &&
              provinceDataP.map((item) => (
                <MenuItem key={item.province_code} value={item.province_code}>
                  {item.province_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select City</InputLabel>
          <Select
            onChange={barangayP}
            value={!isSameAddress ? cityAddrP : cityAddrR}
            disabled={isSameAddress}
          >
            <MenuItem disabled>Select City</MenuItem>
            {cityDataP &&
              cityDataP.length > 0 &&
              cityDataP.map((item) => (
                <MenuItem key={item.city_code} value={item.city_code}>
                  {item.city_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="select">Select Barangay</InputLabel>
          <Select
            onChange={brgyP}
            value={!isSameAddress ? barangayAddrP : barangayAddrR}
            disabled={isSameAddress}
          >
            <MenuItem disabled>Select Barangay</MenuItem>
            {barangayDataP &&
              barangayDataP.length > 0 &&
              barangayDataP.map((item) => (
                <MenuItem key={item.brgy_code} value={item.brgy_code}>
                  {item.brgy_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* END OF PERMANENT ADDRESS  -------------------------------*/}
        <TextField
          element="input"
          id="zipP"
          type="text"
          label="Zip Code"
          // validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={zipPHandler}
          // initialValue={formState.inputs.zipP.value}
          // initialValid={formState.inputs.zipP.isValid}
          disabled={isSameAddress}
          value={zipP}
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
