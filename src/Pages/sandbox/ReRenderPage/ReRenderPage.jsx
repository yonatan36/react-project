import { Fragment, useState } from "react";
import RRPButtonPartial from "./RRPButtonPartial";
import RRPButton2Partial from "./RRPButton2Partial";
import { Button } from "@mui/material";

const ReRenderPage = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggleClick = () => {
    setIsActive(!isActive);
  };
  const handleBtn2Click = () => {
    console.log("btn 2 clicked");
  };
  return (
    <Fragment>
      <h1>Re Render Page</h1>

      <Button
        variant="contained"
        size="large"
        color="secondary"
        Button
        onClick={handleToggleClick}
      >
        {isActive ? "active" : "not active"}
      </Button>
      <RRPButtonPartial isActive={isActive} />
      <RRPButton2Partial onClick={handleBtn2Click}>
        Click me to activate something
      </RRPButton2Partial>
    </Fragment>
  );
};
export default ReRenderPage;
