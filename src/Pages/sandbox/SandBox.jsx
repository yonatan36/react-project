import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { Outlet } from "react-router-dom";

function SandBox() {
  const navigate = useNavigate();

  const NestedRoutePage = () => {
    navigate("/nr");
  };
  const RP1Page = () => {
    navigate("/rp1");
  };
  const ReRenderPage = () => {
    navigate("/ReRenderPage");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap={5}
      marginTop={2}
    >
      <Box display="flex" justifyContent="center" gap={2}>
        <Button
          onClick={NestedRoutePage}
          variant="contained"
          size="large"
          color="secondary"
        >
          NestedRoutePage
        </Button>
        <Button
          onClick={RP1Page}
          variant="contained"
          size="large"
          color="secondary"
        >
          RP1
        </Button>
        <Button
          onClick={ReRenderPage}
          variant="contained"
          size="large"
          color="secondary"
        >
          Re Render Page
        </Button>
      </Box>
      {
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Sandbox Page!
        </Typography>
      }
      <Outlet />
    </Box>
  );
}

export default SandBox;
