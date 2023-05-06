import React, { useEffect, useState } from "react";
import CardComponent from "../components/cardcomponent";
import { Box, Grid, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/ROUTES";
import jwt_decode from "jwt-decode";

const MyCards = () => {
  const [cardsArr, setCardArr] = useState(null);
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  let qparams = useQueryParams();
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        // console.log("data", data);
        // setCardsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);

        toast.error("Oops");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      setCardArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("Deletion was successful");
      await axios.delete("/cards/" + id);
    } catch (err) {
      console.log("error delate", err.response.data);
    }
  };

  const delete1 = (id) => {
    setCardArr(cardsArr.filter((card) => card[1]._id !== id));
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`edit/${id}`);
  };
  const handleBtnCliclToCreate = () =>{
navigate("/create")
  }
  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          my cards
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Find Your Perfect Nest on Our Home Page
        </Typography>
      </Box>
      <IconButton
        onClick={handleBtnCliclToCreate}
        size="large"
        color="secondary">
        <AddCircleIcon fontSize="inherit" />
      </IconButton>

      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item._id + Date.now()}>
            <Typography
              sx={{
                backgroundColor: "green",
                color: "white",
                padding: "2px 6px",
                borderRadius: "5px",
                marginTop: "5px",
                width: "max-content",
                marginX: "auto",
              }}
            >
              Your card!
            </Typography>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={
                item.country +
                ", " +
                item.city +
                ", " +
                item.street +
                " " +
                item.houseNumber
              }
              img={item.image ? item.image.url : ""}
              description={item.description}
              email={item.email}
              createdAt={item.createdAt}
              likes={item.likes}
              bizNumber={item.bizNumber}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onDeletefav={delete1}
              notConnected={!payload}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === item.user_id)
              }
              canEdit={payload && payload.biz && payload._id === item.user_id}
              isFav={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default MyCards;
