import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import validetionProfileSchema from "../validation/profileValidation";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams, Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";
import { toast } from "react-toastify";
import axios from "axios";
import useLoggedIn from "../hooks/useLoggedIn";

const Profile = () => {
  const theme = useTheme();
  const { id } = useParams();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [errorFroemJoi, setErrorFromJoi] = useState();
  const [inputState, SetInputState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/userInfo/");
        let newInputState = {
          ...data,
        };
        delete newInputState.biz;
        delete newInputState.isAdmin;
        delete newInputState._id;
        SetInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const newInputState = { ...inputState, [id]: value };
    SetInputState(newInputState);

    const joiResponse = validetionProfileSchema(newInputState);

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

  const handleSubmit = async (ev) => {
    try {
      const joiRespone = validetionProfileSchema(inputState);
      setErrorFromJoi(joiRespone);
      if (joiRespone) {
        toast.error(joiRespone);
        console.log("prifile", joiRespone);
        return;
      }
      await axios.put("/users/userInfo/" + id, inputState);
      loggedIn();
      toast.success("The changes was successful");
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error(err.response.data);
      console.log("prifile", err.response.data);
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
                  required
                  name="firstName"
                  id="firstName"
                  value={inputState.firstName ? inputState.firstName : ""}
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
                  value={inputState.middleName ? inputState.middleName : ""}
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
                  required
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  value={inputState.lastName ? inputState.lastName : ""}
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
                  required
                  label="Phone"
                  name="phone"
                  id="phone"
                  value={inputState.phone ? inputState.phone : ""}
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
                  required
                  label="email"
                  name="email"
                  id="email"
                  value={inputState.email ? inputState.email : ""}
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
                  value={inputState.password ? inputState.password : ""}
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
                  required
                  label="Image URL"
                  name="imageUrl"
                  id="imageUrl"
                  value={inputState.imageUrl ? inputState.imageUrl : ""}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.imageUrl && (
                  <Alert severity="warning">
                    {errorFroemJoi.imageUrl.map((item) => (
                      <div key={"imageUrl-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Image Alt"
                  name="imageAlt"
                  id="imageAlt"
                  value={inputState.imageAlt ? inputState.imageAlt : ""}
                  onChange={handleInputChange}
                />
                {errorFroemJoi && errorFroemJoi.imageAlt && (
                  <Alert severity="warning">
                    {errorFroemJoi.imageAlt.map((item) => (
                      <div key={"imageAlt-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
                         
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="State"
                  name="state"
                  id="state"
                  value={inputState.state ? inputState.state : ""}
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
                  required
                  label="Country"
                  name="country"
                  id="country"
                  value={inputState.country ? inputState.country : ""}
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
                  required
                  label="City"
                  name="city"
                  id="city"
                  value={inputState.city ? inputState.city : ""}
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
                  required
                  label="Street"
                  name="street"
                  id="street"
                  value={inputState.street ? inputState.street : ""}
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
                  required
                  label="House Number"
                  name="houseNumber"
                  id="houseNumber"
                  value={inputState.houseNumber ? inputState.houseNumber : ""}
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
                  required
                  label="zipCode"
                  name="zipCode"
                  id="zipCode"
                  value={inputState.zipCode ? inputState.zipCode : ""}
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

export default Profile;