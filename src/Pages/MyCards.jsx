import React, { useEffect, useState } from "react";
import CardComponent from "../components/cardcomponent";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

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

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`edit/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }

  const handleLikeFromInitialCardsArr = async (id) => {
    try {
      const { data } = await axios.patch("/cards/card-like/" + id);
      console.log(data);
    } catch (err) {
      toast.info("Card unliked successfully!");
      console.log(err);
    }
  };
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
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
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
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && (payload.biz || payload.isAdmin)}
              onLike={handleLikeFromInitialCardsArr}
              noLike={handleLikeFromInitialCardsArr}
              notConnected={!payload}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default MyCards;
