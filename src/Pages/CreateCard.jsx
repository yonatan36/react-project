import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { Button } from "@mui/material";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { Theme } from "@mui/material";
import validateCreateSchema, {
  validateCreateCardParamsSchema,
} from "../validation/createValidation";




const CardCreationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  // State variables to capture form data
  const [errorFroemJoi, setErrorFromJoi] = useState({});
  const [inputState, setInputState] = useState();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");



useEffect(() => {
  (async () => {
    try {
      // Fetch data from backend
      const { data } = await axios.get("/cards/" + id);

      // Extract necessary data from fetched data
      let newInputState = {
        ...data,
      };

      // Update inputState with fetched data
      setInputState(newInputState);

      // Perform validation on fetched data
      const joiResponse = validateCreateSchema(newInputState);

      // Update errorFromJoi state with validation result
      setErrorFromJoi(joiResponse);
    } catch (err) {
      console.log("error from axios", err);
    }
  })();
}, [id]);


  // Event handler for capturing user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "subTitle") {
      setSubTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "url") {
      setUrl(value);
    } else if (name === "country") {
      setCountry(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "street") {
      setStreet(value);
    } else if (name === "houseNumber") {
      setHouseNumber(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

 // Submit handler for creating the card
const handleSaveBtnClick = async (event) => {
  event.preventDefault();

  // Form data to be sent to the backend
  const formData = {
    title,
    subTitle,
    description,
    url,
    country,
    city,
    street,
    houseNumber,
    email,
    phone,
  };

  try {
    // Send POST request to backend server
    const joiResponse = validateCreateSchema(inputState);
    setErrorFromJoi(joiResponse); // Update the state variable with the response
    console.log(joiResponse);
    if (!joiResponse) {
      await axios.post("/cards/", formData);
      toast.success("Card created successfully");
      navigate(ROUTES.HOME);
    } else {
      toast.error("Please fill all required fields");
    }
  } catch (err) {
    console.log("Error creating card", err);
    toast.error("Error creating card");
  }
};


  const handleCancleBtnClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          p: 4,

          borderRadius: "20px",
          boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create card
          </Typography>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: 2,
            }}
          />
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="url"
                  label="Url"
                  name="url"
                  autoComplete="url"
                  onChange={handleInputChange}
                  value={url}
                />
                {errorFroemJoi && errorFroemJoi.url && (
                  <Alert severity="warning">
                    {errorFroemJoi.url.join("<br>")}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  onChange={handleInputChange}
                  value={title}
                />
                {errorFroemJoi && errorFroemJoi.title && (
                  <Alert severity="warning">
                    {errorFroemJoi.title.map((item) => (
                      <div key={"title-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="subTitle"
                  label="subTitle"
                  id="subTitle"
                  type="text"
                  autoComplete="subTitle"
                  onChange={handleInputChange}
                  value={subTitle}
                />
                {errorFroemJoi && errorFroemJoi.price && (
                  <Alert severity="warning">
                    {errorFroemJoi.price.map((item) => (
                      <div key={"price-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  onChange={handleInputChange}
                  value={description}
                />
                {errorFroemJoi && errorFroemJoi.description && (
                  <Alert severity="warning">
                    {errorFroemJoi.description.map((item) => (
                      <div key={"description-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="country"
                  id="country"
                  autoComplete="country"
                  onChange={handleInputChange}
                  value={country}
                />
                {errorFroemJoi && errorFroemJoi.country && (
                  <Alert severity="warning">
                    {errorFroemJoi.country.map((item) => (
                      <div key={"country-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="city"
                  id="city"
                  autoComplete="city"
                  onChange={handleInputChange}
                  value={city}
                />
                {errorFroemJoi && errorFroemJoi.city && (
                  <Alert severity="warning">
                    {errorFroemJoi.city.map((item) => (
                      <div key={"city-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="street"
                  id="street"
                  autoComplete="street"
                  onChange={handleInputChange}
                  value={street}
                />

                {errorFroemJoi && errorFroemJoi.street && (
                  <Alert severity="warning">
                    {errorFroemJoi.street.map((item) => (
                      <div key={"street-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="houseNumber"
                  label="houseNumber"
                  id="houseNumber"
                  autoComplete="houseNumber"
                  onChange={handleInputChange}
                  value={houseNumber}
                />
                {errorFroemJoi && errorFroemJoi.houseNumber && (
                  <Alert severity="warning">
                    {errorFroemJoi.houseNumber.map((item) => (
                      <div key={"houseNumber-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="email"
                  id="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={email}
                />
                {errorFroemJoi && errorFroemJoi.email && (
                  <Alert severity="warning">
                    {errorFroemJoi.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.phone && (
                  <Alert severity="warning">
                    {errorFroemJoi.phone.map((item) => (
                      <div key={"phone-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSaveBtnClick}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCancleBtnClick}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
export default CardCreationForm;
