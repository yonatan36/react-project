import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box,Typography ,Grid} from "@mui/material";
import Alert from "@mui/material/Alert";
import validetionRegisterSchema from "../validation/registerValidation";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "90%",
      maxWidth: "55ch",
    },
  },
  button: {
    margin: theme.spacing(2),
    minWidth: "10ch",
  },

}));


const RegistrationForm = () => {
  const classes = useStyles();

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
});




  const handleInputChange = (event) => {
let newInputState = JSON.parse(JSON.stringify(inputState));
newInputState[event.target.id] = event.target.value;
SetInputState(newInputState)
  };

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
      houseNumber:"",


      
    });
  };

  const [errorFroemJoi, setErrorFromJoi] = useState({});
  const handleSubmit = (event) => {
  const joiRespone = validetionRegisterSchema(inputState);
setErrorFromJoi(joiRespone)
// clear the form after submission
  };

 return (
   <form className={classes.root} onSubmit={handleSubmit}>
     <Typography>register -</Typography>
     <Box>
       <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="First Name"
             name="firstName"
             id="firstName"
             value={inputState.firstName}
             onChange={handleInputChange}
           />
           {errorFroemJoi.firstName && (
             <Alert severity="warning">
               {errorFroemJoi.firstName.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Middle Name"
             name="middleName"
             id="middleName"
             value={inputState.middleName}
             onChange={handleInputChange}
           />
           {errorFroemJoi.middleName && (
             <Alert severity="warning">
               {errorFroemJoi.middleName.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Last Name"
             name="lastName"
             id="lastName"
             value={inputState.lastName}
             onChange={handleInputChange}
           />
           {errorFroemJoi.lastName && (
             <Alert severity="warning">
               {errorFroemJoi.lastName.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Phone"
             name="phone"
             id="phone"
             value={inputState.phone}
             onChange={handleInputChange}
           />
           {errorFroemJoi.phone && (
             <Alert severity="warning">
               {errorFroemJoi.phone.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="email"
             name="email"
             id="email"
             value={inputState.email}
             onChange={handleInputChange}
           />
           {errorFroemJoi.email && (
             <Alert severity="warning">
               {errorFroemJoi.email.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="password"
             name="password"
             id="password"
             value={inputState.password}
             onChange={handleInputChange}
           />
           {errorFroemJoi.password && (
             <Alert severity="warning">
               {errorFroemJoi.password.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Image URL"
             name="imgUrl"
             id="imgUrl"
             value={inputState.imgUrl}
             onChange={handleInputChange}
           />
           {errorFroemJoi.imgUrl && (
             <Alert severity="warning">
               {errorFroemJoi.imgUrl.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Image Alt"
             name="imgAlt"
             id="imgAlt"
             value={inputState.imgAlt}
             onChange={handleInputChange}
           />
           {errorFroemJoi.imgAlt && (
             <Alert severity="warning">
               {errorFroemJoi.imgAlt.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="State"
             name="state"
             id="state"
             value={inputState.state}
             onChange={handleInputChange}
           />
           {errorFroemJoi.state && (
             <Alert severity="warning">
               {errorFroemJoi.state.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Country"
             name="country"
             id="country"
             value={inputState.country}
             onChange={handleInputChange}
           />
           {errorFroemJoi.country && (
             <Alert severity="warning">
               {errorFroemJoi.country.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="City"
             name="city"
             id="city"
             value={inputState.city}
             onChange={handleInputChange}
           />
           {errorFroemJoi.city && (
             <Alert severity="warning">{errorFroemJoi.city.join("<br>")}</Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="Street"
             name="street"
             id="street"
             value={inputState.street}
             onChange={handleInputChange}
           />
           {errorFroemJoi.street && (
             <Alert severity="warning">
               {errorFroemJoi.street.join("<br>")}
             </Alert>
           )}
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             label="House Number"
             name="houseNumber"
             id="houseNumber"
             value={inputState.houseNumber}
             onChange={handleInputChange}
           />
           {errorFroemJoi.houseNumber && (
             <Alert severity="warning">
               {errorFroemJoi.houseNumber.join("<br>")}
             </Alert>
           )}
         </Grid>
       </Grid>
     </Box>
     <Grid container spacing={2}>
       <Grid item xs={12} sm={6} md={4} lg={3}>
         <Button className={classes.button} fullWidth onClick={handleCancel}>
           Cancel
         </Button>
       </Grid>
       <Grid item xs={12} sm={6} md={4} lg={3}>
         <Button
           onClick={handleSubmit}
           className={classes.button}
           fullWidth
           type="button"
           variant="contained"
           color="primary"
         >
           Submit
         </Button>
       </Grid>
       <Grid item xs={12} sm={6} md={4} lg={3}>
         <Button className={classes.button} fullWidth>
           Return
         </Button>
       </Grid>
     </Grid>
   </form>
 );
};

export default RegistrationForm;
