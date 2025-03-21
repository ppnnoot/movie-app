import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState();


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery); // send to App.jsx
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };


  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            sx={{ flex: 1, backgroundColor: "#fff", borderRadius: "4px" }}
          />
          <IconButton
            sx={{ color: "#fff", marginLeft: 1 }}
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
