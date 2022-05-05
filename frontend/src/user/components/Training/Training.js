import React, { useEffect, useState } from "react";
import TrainingEdit from "./TrainingEdit";

import TrainingList from "./TrainingList";
import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";

const Training = (props) => {
  const [userData, setUserData] = useState([]);
  const [success, setSuccess] = useState();
  const [editData, setEditData] = useState();
  const [selectedFilter, setSelectedFilter] = useState(1);

  const getYear = () => {
    return new Date().getFullYear();
  };

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredDataToShow = props.trainingData?.filter((filteredYear) => {
    if (selectedFilter === 2) {
      return filteredYear;
    } else {
      return getYear() - filteredYear.toDate < 6;
    }
  });

  console.log(getYear());

  const clearSuccess = () => {
    setSuccess(null);
  };
  const setAddedData = (userData, success) => {
    setUserData(userData);
    setSuccess(success);
  };
  const setId = (editData) => {
    setEditData(editData);
  };

  const editModeHandler = (editData) => {
    props.updateEditModeState(true);
    setId(editData);
  };

  if (props.isAddMode) {
    return (
      <TrainingEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <TrainingEdit
        addingItem={false}
        editData={editData}
        updateAddModeState={props.updateEditModeState}
        setUserData={props.userUpdate}
      />
    );
  } else {
    return (
      <React.Fragment>
        <form>
          <Box sx={{ minWidth: 60 }}>
            <FormControl sx={{ m: 2, minWidth: 220 }}>
              <InputLabel id="inputData">Select Data to Print</InputLabel>
              <Select
                labelId="filter"
                id="filter"
                value={selectedFilter}
                label="Select Data to Print"
                onChange={handleChange}
              >
                <MenuItem value={1}>Display 5years or later</MenuItem>
                <MenuItem value={2}>Display All</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
        <TrainingList
          setIsEditModeHandler={editModeHandler}
          list={filteredDataToShow}
          setUserData={props.userUpdate}
        />
      </React.Fragment>
    );
  }
};

export default Training;
