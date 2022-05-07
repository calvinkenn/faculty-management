import React from "react";
import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";

import "./Filter.css";

const Filter = (props) => {
  return (
    <div className="form-cont">
      <form>
        <Box sx={{ minWidth: 60 }}>
          <FormControl sx={{ m: 2, minWidth: 220 }}>
            <InputLabel id="inputData">Select Data to Display</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value={props.value}
              label="Select Data to Display"
              onChange={props.onChange}
            >
              <MenuItem value={1}>All Faculty Members</MenuItem>
              <MenuItem value={2}>BSIT Faculty Members</MenuItem>
              <MenuItem value={3}>BLIS Faculty Members</MenuItem>
              <MenuItem value={4}>ALLIED Faculty Members</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </form>
    </div>
  );
};

export default Filter;
