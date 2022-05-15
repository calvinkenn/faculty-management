import React, { useEffect, useState } from "react";
import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";

import Pagination from "../../../shared/components/Pagination/Pagination";
import TrainingEdit from "./TrainingEdit";
import TrainingList from "./TrainingList";

const Training = (props) => {
  const [userData, setUserData] = useState([]);
  const [success, setSuccess] = useState();
  const [editData, setEditData] = useState();
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

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

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredDataToShow?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredDataToShow?.length / displayPerPage));
  }, [itemOffset, 5, filteredDataToShow]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % filteredDataToShow?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
        {props.trainingData?.length > 0 && (
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
        )}
        <TrainingList
          setIsEditModeHandler={editModeHandler}
          list={currentItems}
          setUserData={props.userUpdate}
        />
        {currentItems?.length > 0 && (
          <Pagination
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
          />
        )}
      </React.Fragment>
    );
  }
};

export default Training;
