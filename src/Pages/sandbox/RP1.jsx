import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { counterActions } from "../../store/counter";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { toast } from "react-toastify";


const RP1 = () => {
  const [txt, setTxt] = useState("");
  const dispatch = useDispatch();
  const handleAdd1 = () => {
    dispatch(counterActions.add1());
    toast.info("add +1")
  };

  const handleSub1 = () => {
    dispatch(counterActions.sub1());
     toast.info("sub -1");
  };
  const handleClear = () => {
    dispatch(counterActions.clear());
     toast.info("cleard!");
  };

  const handleInputChange = (e) => {
    setTxt(e.target.value);
  };

  const handleAddClick = () => {
    dispatch(counterActions.addNumber(txt));
    toast.info("number add!  go to rp2 Link")
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap={5}
      marginTop={6}
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
        <Button
          onClick={handleClear}
          variant="contained"
          size="large"
        
        >
          clear
        </Button>
      </Box>

      <Box marginTop={3}>
        <Button component={Link} to="/rp2" size="large">
          Click here to go to RP2
        </Button>
      </Box>
      <Box marginTop={4}>
        <Button component={Link} color="secondary" to="/sandbox" size="large">
          Back to sandbox
        </Button>
      </Box>
    </Box>
  );
};

export default RP1;
