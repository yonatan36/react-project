import { Button } from "@mui/material";

const RRPButtonPartial = ({ isActive }) => {
  return (
    <Button
      variant="contained"
      size="large"
      style={{ background: `${isActive ? "red" : "blue"}` }}
      Button
    >
      Click
    </Button>
  );
};
export default RRPButtonPartial;
