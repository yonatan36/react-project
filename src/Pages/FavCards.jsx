import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function FavCards() {
  const navigate = useNavigate();
  const handleClickFav = () => {
    navigate("/create");
  };
  return (
    <Typography>
      <Button variant="text" color="primary" onClick={handleClickFav}>
        <AddCircleOutlineIcon />
      </Button>
    </Typography>
  );
};


export default FavCards;
