import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import validetionLoginSchema from "../validation/loginValidation";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";
import axios from "axios";
import { toast } from "react-toastify";
import useLoggedIn from "../hooks/useLoggedIn";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const [errorFroemJoi, setErrorFromJoi] = useState();
  const [disabled, setDisabled] = useState(true);

  const [inputState, SetInputState] = useState({
    email: "",
    password: "",
  });

  const handleCancel = () => {
    SetInputState({
      email: "",
      password: "",
    });
    setErrorFromJoi();
  };

  const [isLoading, setIsLoading] = useState(false);
  const getUserInfo = async () => {
    const { data } = await axios.get("/users/userInfo");
    return data.firstName;
  };

  const handleSubmit = async (event) => {
    try {
      const joiRespone = validetionLoginSchema(inputState);
      setErrorFromJoi(joiRespone);
      if (joiRespone) {
        toast.error("try again");
        return;
      }
      setIsLoading(true);
      const { data } = await axios.post("/users/login", {
        email: inputState.email,
        password: inputState.password,
      });
      localStorage.setItem("token", data.token);
      setTimeout(async () => {
        setIsLoading(false);
        loggedIn();
        navigate(ROUTES.HOME);
        const firstName = await getUserInfo();
        toast.success(`Welcome ${firstName}! Good to see you`);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data);
      console.log("error from axios", err.response.data);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const newInputState = { ...inputState, [id]: value };
    SetInputState(newInputState);

    const joiResponse = validetionLoginSchema(newInputState);

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
    <Container component="main" maxWidth="sm">
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
          <Avatar sx={{ m: 2, bgcolor: "#7FFFD4" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="div" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark" ? "#424242" : "white",
                  }}
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
                  type="password"
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
                    disabled={disabled || isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Login"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <br />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={ROUTES.REGISTER}>
                  <Typography variant="body2" color="initial">
                    Did not have an account? Sign up
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

export default Login;
