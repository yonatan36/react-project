import React from "react";
import { Link, Outlet } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
const NestedRoutePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap={5}
      marginTop={3}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Nested page
      </Typography>

      <Box>
        <Button component={Link} to="/nr/nestedpage1" size="large">
          nested page 1
        </Button>
        <Button component={Link} to="/nr/nestedpage2" size="large">
          nested page 2
        </Button>
        <Outlet />
      </Box>
      <Box marginTop={6}>
        <Button component={Link} color="secondary" to="/sandbox" size="large">
          Back to sandbox
        </Button>
      </Box>
    </Box>
  );
};

export default NestedRoutePage;
