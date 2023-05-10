import React, { useEffect, useState } from "react";
import CardComponent from "../components/cardcomponent";
import { Box, Grid, Container, CardMedia } from "@mui/material";
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
  const [email, setEmail] = useState("No user logged in");
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [biz, setBiz] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [myCardIds, setMyCardIds] = useState([]);
  let qparams = useQueryParams();
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setBiz(data.biz);
        setIsAdmin(data.isAdmin);
        setEmail(data.email);
      })
      .catch((err) => console.log(err));
  }, []);

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
      .get("/cards/my-cards")
      .then(({ data }) => {
        setMyCardIds(data.map((item) => item._id));
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
      <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "70px" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to our Second-Hand Sales!
        </Typography>
        <Box>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            User Information
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Email: {email}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Name: {firstName} {lastName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Biz: {biz ? "true" : "false"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Admin: {isAdmin ? "true" : "false"}
          </Typography>

        </Box>
        <br />
        <CardMedia
          component="img"
          image="https://source.unsplash.com/random/800x600?second-hand+sales"
          alt="Second-Hand Sales"
          height="330"
  
        />
        <Typography variant="body1" gutterBottom sx={{ marginTop: "30px" }}>
          Discover amazing deals on high-quality second-hand items at our online
          marketplace. We offer a wide variety of products, including clothing,
          electronics, furniture, and more. All of our items are carefully
          curated and thoroughly inspected to ensure their quality and
          authenticity, so you can shop with confidence knowing that you're
          getting the best value for your money. Whether you're on the hunt for
          a unique vintage find or a modern gadget at a fraction of the retail
          price, we've got you covered. Shop now and join our community of savvy
          shoppers today!
        </Typography>
      </Container>
      <br />
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

export default Home;
