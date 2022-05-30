import React, { useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./FilterAnnouncement.css";

const FilterAnnouncement = (props) => {
  return (
    <div className="top-bar">
      <div className="ann-search">
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.onSearchChange}
          />
        </form>
      </div>
      <span />
      <div className="ann-filter">
        <Box sx={{ minWidth: 60 }}>
          <FormControl sx={{ m: 2, minWidth: 220 }}>
            <InputLabel id="inputData">Select Data to Display</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value={props.displayFilterValue}
              label="Select Announcement to Display"
              onChange={props.onDisplayFilterChange}
            >
              <MenuItem value={1}>Display All</MenuItem>
              <MenuItem value={2}>Filter By Date</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <span />
      {props.displayFilterValue == 2 && (
        <div className="ann-date">
          <DatePicker
            views={["year", "month"]}
            label="Filter date"
            value={props.filterValue}
            onChange={(newValue) => {
              props.onFilterChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default FilterAnnouncement;
