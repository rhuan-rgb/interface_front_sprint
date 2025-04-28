import React from "react";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "25px",
        backgroundColor: "#d90000",
        bottom: 0,
        position:'fixed',
        width: "100%",
        
      }}
    ></Box>
  );
};

export default Footer;