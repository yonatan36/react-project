import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import validetionRegisterSchema from "../validation/registerValidation";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";
import { toast } from "react-toastify";
import axios from "axios";

const RegistrationForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [errorFroemJoi, setErrorFromJoi] = useState();
  const [inputState, SetInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });

  const handleCancel = () => {
    SetInputState({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      imgUrl: "",
      imgAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
    });
    setErrorFromJoi({});
  };

  const handleSubmit = async (event) => {
    try {
      const joiRespone = validetionRegisterSchema(inputState);
      setErrorFromJoi(joiRespone);
      // clear the form after submission
      if (joiRespone) {
        toast.error("try again");
        return;
      }

      const { data } = await axios.post("/users/register", {
        firstName: inputState.firstName,
        middleName: inputState.middleName,
        lastName: inputState.lastName,
        phone: inputState.phone,
        email: inputState.email,
        password: inputState.password,
        imageUrl: inputState.imgUrl,
        imageAlt: inputState.imgAlt,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zipCode,
      });
      //move to login page
      toast.success("The registration was successful");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response.data);
      console.log("register", err.response.data);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const newInputState = { ...inputState, [id]: value };
    SetInputState(newInputState);

    const joiResponse = validetionRegisterSchema(newInputState);

    if (joiResponse && joiResponse[id]) {
      setErrorFromJoi({ ...errorFroemJoi, [id]: joiResponse[id] });
    } else {
      setErrorFromJoi({ ...errorFroemJoi, [id]: "" });
    }
    if (!joiResponse) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        sx={{
          p: 4,
          bgcolor: theme.palette.mode === "dark" ? "#424242" : "#f5f5f5",
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
          <Avatar sx={{ m: 2, bgcolor: "#6495ED" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="div" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
               
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  value={inputState.firstName}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.firstName && (
                  <Alert severity="warning">
                    {errorFroemJoi.firstName.map((item) => (
                      <div key={"firstname-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  id="middleName"
                  value={inputState.middleName}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.middleName && (
                  <Alert severity="warning">
                    {errorFroemJoi.middleName.map((item) => (
                      <div key={"middlename-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
           
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  value={inputState.lastName}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.lastName && (
                  <Alert severity="warning">
                    {errorFroemJoi.lastName.map((item) => (
                      <div key={"lastname-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  
                  label="Phone"
                  name="phone"
                  id="phone"
                  value={inputState.phone}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
            
                  label="email"
                  name="email"
                  id="email"
                  value={inputState.email}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.email && (
                  <Alert severity="warning">
                    {errorFroemJoi.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
            
                  label="password"
                  name="password"
                  id="password"
                  value={inputState.password}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.password && (
                  <Alert severity="warning">
                    {errorFroemJoi.password.map((item) => (
                      <div key={"password-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
               
                  label="Image URL"
                  name="imgUrl"
                  id="imgUrl"
                  value={inputState.imgUrl}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.imgUrl && (
                  <Alert severity="warning">
                    {errorFroemJoi.imgUrl.map((item) => (
                      <div key={"imgUrl-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
            
                  label="Image Alt"
                  name="imgAlt"
                  id="imgAlt"
                  value={inputState.imgAlt}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.imgAlt && (
                  <Alert severity="warning">
                    {errorFroemJoi.imgAlt.map((item) => (
                      <div key={"imgAlt-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
               
                  label="State"
                  name="state"
                  id="state"
                  value={inputState.state}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.state && (
                  <Alert severity="warning">
                    {errorFroemJoi.state.map((item) => (
                      <div key={"state-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
           
                  label="Country"
                  name="country"
                  id="country"
                  value={inputState.country}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.country && (
                  <Alert severity="warning">
                    {errorFroemJoi.country.map((item) => (
                      <div key={"country-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
            
                  label="City"
                  name="city"
                  id="city"
                  value={inputState.city}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.city && (
                  <Alert severity="warning">
                    {errorFroemJoi.city.map((item) => (
                      <div key={"city-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
       
                  label="Street"
                  name="street"
                  id="street"
                  value={inputState.street}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.street && (
                  <Alert severity="warning">
                    {errorFroemJoi.street.map((item) => (
                      <div key={"street-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
       
                  label="House Number"
                  name="houseNumber"
                  id="houseNumber"
                  value={inputState.houseNumber}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.houseNumber && (
                  <Alert severity="warning">
                    {errorFroemJoi.houseNumber.map((item) => (
                      <div key={"housenumber-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
            
                  label="zipCode"
                  name="zipCode"
                  id="zipCode"
                  value={inputState.zipCode}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.zipCode && (
                  <Alert severity="warning">
                    {errorFroemJoi.zipCode.map((item) => (
                      <div key={"zipCode-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={3}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth color="primary" variant="outlined">
                  <SyncIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

            <br />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={ROUTES.LOGIN}>
                  <Typography variant="body2" color="initial">
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
