import React from "react";

import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import "./Sort.css";

const Sort = (props) => {
  return (
    <div className="form-cont">
      <form>
        <Box sx={{ minWidth: 60 }}>
          <FormControl sx={{ m: 2, minWidth: 220 }}>
            <InputLabel id="inputData">{props.label}</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value={props.value}
              label={props.label}
              onChange={props.onChange}
            >
              <MenuItem value={1}>Employee Number</MenuItem>
              <MenuItem value={2}>First Name</MenuItem>
              <MenuItem value={3}>Last Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </form>
    </div>
  );
};

export default Sort;
