import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LikesCardComponent from "../components/LikesCardComponent";

import { Box, Grid } from "@mui/material";
import { toast } from "react-toastify";
const FAVCARDS = () => {
  const payload = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.payload
  );

  const [likedCards, setLikedCards] = useState(null);
  const [cardsArr, setCardArr] = useState(null);

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        const { data } = await axios.get("/cards/cards");

        const filterdData = data.filter((card) =>
          card.likes.includes(payload && payload._id)
        );
        setLikedCards(filterdData);
        setCardArr(filterdData); // Update the value of cardsArr
      } catch (err) {
        console.log(err);
      }
    };

    fetchLikedCards();
  }, []);

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

  const handleCardLike = async (id) => {
    try {
      setLikedCards((prevLikedCards) =>
        prevLikedCards.filter((cardId) => cardId !== id)
      );
      setCardArr((prevCardsArr) =>
        prevCardsArr.filter((card) => card._id !== id)
      );
      toast.success("Card unliked successfully!");
      await axios.patch("/cards/card-like/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr &&
          cardsArr.map((item) => (
            <Grid item xs={4} key={item._id + Date.now()}>
              <LikesCardComponent
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
                canEdit={payload && (payload.biz || payload.isAdmin)}
                notConnected={!payload}
                onDelete={handleDeleteFromInitialCardsArr}
                noLike={handleCardLike} // Pass the cardId to the handleCardLike function
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FAVCARDS;
