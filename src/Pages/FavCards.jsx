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
  // Local state to store the liked cards

  const [likedCards, setLikedCards] = useState([]);
  const [cardsArr, setCardArr] = useState(null);

  // Fetch the liked cards from the backend API on component mount
  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        const { data } = await axios.get("/cards/cards");
        // Add a check to ensure payload is not null
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
  // Function to handle card unlike action
  const handleCardLike = async (id) => {
    try {
      // Send unlike request to backend API
      await axios.patch("/cards/card-like/" + id);
      // Update likedCards state by removing the card ID from the array
      const updatedLikedCards = likedCards.filter((cardId) => cardId !== id);
      setLikedCards(updatedLikedCards);
           toast.success("Card unliked successfully!");
 
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
                noLike={ handleCardLike} // Pass the cardId to the handleCardLike function
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FAVCARDS;
