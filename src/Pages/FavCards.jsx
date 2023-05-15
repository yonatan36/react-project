import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../components/cardcomponent";
import { Box, Grid, Container,Typography } from "@mui/material";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const FAVCARDS = () => {
  const [cardsArr, setCardArr] = useState(null);
  const [likedCards, setLikedCards] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [myCardIds, setMyCardIds] = useState([]);
  const payload = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.payload
  );
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setMyCardIds(data.map((item) => item._id));
      })
      .catch((err) => console.log(err));
  }, []);

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
    setCardToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCard = async () => {
    try {
      setCardArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== cardToDelete)
      );
      setIsDeleteDialogOpen(false);
      toast.success("Deletion was successful");
      await axios.delete("/cards/" + cardToDelete);
    } catch (err) {
      console.log("error delate", err.response.data);
    }
  };

  //fav cards
  const delete1 = (id) => {
    setCardArr((prevCardsArr) =>
      prevCardsArr.filter((card) => card._id !== id)
      );
      toast.success("removed!")
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    <Box>
        <Box textAlign="center" mt={4}>
          <Typography variant="h3" gutterBottom>
            your favorites cards!❤️
          </Typography>
        </Box>
      <Container maxWidth="md" sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {cardsArr.map((item) => (
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
                isMyCard={myCardIds.includes(item._id)}
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
      </Container>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
        <DialogContent>
          Deleting a card is permanent and cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteCard} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FAVCARDS;
