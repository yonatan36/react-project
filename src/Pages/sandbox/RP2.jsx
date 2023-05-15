import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const RP2 = () => {
  const counter = useSelector((bigState) => bigState.counterSlice.counter);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap={5}
      marginTop={2}
    >
      <Fragment>
        <Typography variant="h1">{counter}</Typography>
        <Button component={Link} to="/rp1" size="large">
         back to rp1
        </Button>
      </Fragment>
    </Box>
  );
};

export default RP2;
