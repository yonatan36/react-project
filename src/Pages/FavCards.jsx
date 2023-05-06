import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../components/cardcomponent";
import { Box, Grid } from "@mui/material";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const FAVCARDS = () => {
  const [likedCards, setLikedCards] = useState(null);
  const [cardsArr, setCardArr] = useState(null);
  const payload = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.payload
  );
    const navigate = useNavigate();

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

  const delete1 = (id) => {
    setCardArr((prevCardsArr) =>
      prevCardsArr.filter((card) => card._id !== id)
    );
  };
   const handleEditFromInitialCardsArr = (id) => {
     navigate(`edit/${id}`);
   };

  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr &&
          cardsArr.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={item._id + Date.now()}>
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

export default FAVCARDS;
