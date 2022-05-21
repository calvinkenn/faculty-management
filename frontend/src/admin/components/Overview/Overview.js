import React, { useState } from "react";
import PrintData, { ComponentToPrint } from "../PrintData/PrintData";
import { Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import noData from "../../../assets/Image/no-data-found.png";

import OverviewList from "./OverviewList";

const Overview = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredDataToPrint = props.activeUserData?.filter((pendingUser) => {
    if (selectedFilter === 2) {
      return pendingUser.faculty.includes("BSIT");
    } else if (selectedFilter === 3) {
      return pendingUser.faculty.includes("BLIS");
    } else if (selectedFilter === 4) {
      return pendingUser.faculty.includes("ALLIED");
    } else {
      return pendingUser;
    }
  });

  if (props.isPrintMode) {
    return (
      <div>
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
                <MenuItem value={1}>All Faculty Members</MenuItem>
                <MenuItem value={2}>BSIT Faculty Members</MenuItem>
                <MenuItem value={3}>BLIS Faculty Members</MenuItem>
                <MenuItem value={4}>ALLIED Faculty Members</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>

        {filteredDataToPrint?.length > 0 ? (
          <PrintData activeUserData={filteredDataToPrint} filterValue={selectedFilter} />
        ) : (
          <div className="no-data-found">
            <img src={noData} />
            <h1>No Data to Print</h1>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <OverviewList
        activeUserData={props.activeUserData}
        pendingUserData={props.pendingUserData}
        deactivatedUserData={props.deactivatedUserData}
        rejectedUserData={props.rejectedUserData}
      />
    );
  }
};

export default Overview;
