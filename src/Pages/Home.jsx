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
import jwt_decode from "jwt-decode";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const Home = () => {
  const [cardsArr, setCardArr] = useState(null);
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  let qparams = useQueryParams();
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
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


  //open the popup
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
  //likes function
  const delete1 = (id) => {
    setCardArr(cardsArr.filter((card) => card[1]._id !== id));
  };
//edit function
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`edit/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Store!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Find Your Perfect Nest on Our Home Page
        </Typography>
      </Box>
      <Grid container spacing={2}>
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
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onDeletefav={delete1}
              canEdit={payload && (payload.biz || payload.isAdmin)}
              notConnected={!payload}
              isFav={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}
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
      </Grid>
    </Box>
  );
};

export default Home;
