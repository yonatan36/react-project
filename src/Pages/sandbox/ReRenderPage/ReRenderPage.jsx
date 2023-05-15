import { Fragment, useState } from "react";
import RRPButtonPartial from "./RRPButtonPartial";
import RRPButton2Partial from "./RRPButton2Partial";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ReRenderPage = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggleClick = () => {
    setIsActive(!isActive);
  };
  const handleBtn2Click = () => {
    console.log("btn 2 clicked");
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
      <Typography variant="h4" component="h1" gutterBottom>
        Re Render Page
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        <Fragment>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleToggleClick}
          >
            {isActive ? "active" : "not active"}
          </Button>

          <RRPButtonPartial isActive={isActive} />
          <RRPButton2Partial onClick={handleBtn2Click}>
            Click me to activate something
          </RRPButton2Partial>
        </Fragment>
      </Box>
      <Box marginTop={6}>
        <Button component={Link} color="secondary" to="/sandbox" size="large">
          Back to sandbox
        </Button>
      </Box>
    </Box>
  );
};
export default ReRenderPage;
