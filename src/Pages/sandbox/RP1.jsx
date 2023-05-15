import {  useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { counterActions } from "../../store/counter";
import TextField from "@mui/material/TextField";
import { Typography, Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const RP1 = () => {
  const [txt, setTxt] = useState("");
  const dispatch = useDispatch();
  const handleAdd1 = () => {
    dispatch(counterActions.add1());
  };

  const handleSub1 = () => {
    dispatch(counterActions.sub1());
  };

  const handleInputChange = (e) => {
    setTxt(e.target.value);
  };

  const handleAddClick = () => {
    dispatch(counterActions.addNumber(txt));
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
          onClick={handleAdd1}
          variant="contained"
          size="large"
          color="secondary"
        >
          <AddCircleIcon />
        </Button>

        <Button
          onClick={handleSub1}
          variant="contained"
          size="large"
          color="secondary"
        >
          <RemoveCircleIcon />
        </Button>

        <TextField type="text" value={txt} onChange={handleInputChange} />

        <Button
          onClick={handleAddClick}
          variant="contained"
          size="large"
          color="secondary"
        >
          Add
        </Button>
      
        <Link
          to="/rp2"
          sx={{ textDecoration: "none", color: "#FFF", fontWeight: "bold" }}
        >
          Click here to go to RP2
        </Link>
      </Box>
    </Box>
  );
};

export default RP1;
