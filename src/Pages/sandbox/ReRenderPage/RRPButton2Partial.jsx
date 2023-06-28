import { memo } from "react";
import { Button } from "@mui/material";
const RRPButton2Partial = ({ children, onClick }) => {


  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      Button
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default memo(RRPButton2Partial);
