import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { counterActions } from "../store/counter";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
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
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 sx={{ fontSize: "3rem", fontWeight: "bold", mb: 4 }}>Welcome!</h1>
      <Fragment
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleAdd1}>
          <AddCircleIcon />
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSub1}>
          <RemoveCircleIcon />
        </Button>
      </Fragment>

      <Fragment>
        <TextField type="text" value={txt} onChange={handleInputChange} />
        <Button color="primary" variant="contained" onClick={handleAddClick}>
          Add
        </Button>
        <Link
          to="/rp2"
          sx={{ textDecoration: "none", color: "#FFF", fontWeight: "bold" }}
        >
          Click here to go to RP2
        </Link>
      </Fragment>
    </Container>
  );
};

export default RP1;
