import React, { useState } from "react";
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

const Login = () => {
  const theme = useTheme();
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

  const [errorFroemJoi, setErrorFromJoi] = useState();
  const navigate = useNavigate();
    const loggedIn = useLoggedIn();
  const handleSubmit = async (event) => {
    try {
      const joiRespone = validetionLoginSchema(inputState);
      setErrorFromJoi(joiRespone);
      if (joiRespone) {
        toast.error("try again");
        return;
      }
      const { data } = await axios.post("/users/login", {
        email: inputState.email,
        password: inputState.password,
      });
      localStorage.setItem("token", data.token);
            loggedIn();
      navigate(ROUTES.HOME);
      toast.success("Welcome to our website!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      toast.error(" Oops, try again");
      console.log("error from axios", err.response.data);
    }
  };

  const handleInputChange = (event) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[event.target.id] = event.target.value;
    SetInputState(newInputState);
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
                  required
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
                  required
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
                    Login
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
