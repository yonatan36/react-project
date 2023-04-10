import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box,Typography } from "@mui/material";

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
  const [formData, setFormData] = useState({
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
    zipcode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
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
      zipcode:"",

      
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // replace with your API call or data handling logic
    handleCancel(); // clear the form after submission
  };

 return (
   <form className={classes.root} onSubmit={handleSubmit}>
     <Typography>register -</Typography>
     <Box>
       <TextField
         required
         label="First Name"
         name="firstName"
         value={formData.firstName}
         onChange={handleChange}
       />
       <TextField
         label="Middle Name"
         name="middleName"
         value={formData.middleName}
         onChange={handleChange}
       />
       <TextField
         required
         label="Last Name"
         name="lastName"
         value={formData.lastName}
         onChange={handleChange}
       />
       <TextField
         required
         label="Phone"
         name="phone"
         value={formData.phone}
         onChange={handleChange}
       />
       <TextField
         required
         label="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
       />
       <TextField
         required
         label="password"
         name="password"
         value={formData.password}
         onChange={handleChange}
       />

       <TextField
         required
         label="Image URL"
         name="imgUrl"
         value={formData.imgUrl}
         onChange={handleChange}
       />
       <TextField
         required
         label="Image Alt"
         name="imgAlt"
         value={formData.imgAlt}
         onChange={handleChange}
       />
       <TextField
         required
         label="State"
         name="state"
         value={formData.state}
         onChange={handleChange}
       />
       <TextField
         required
         label="Country"
         name="country"
         value={formData.country}
         onChange={handleChange}
       />

       <TextField
         required
         label="City"
         name="city"
         value={formData.city}
         onChange={handleChange}
       />
       <TextField
         required
         label="Street"
         name="street"
         value={formData.street}
         onChange={handleChange}
       />
       <TextField
         required
         label="House Number"
         name="houseNumber"
         value={formData.houseNumber}
         onChange={handleChange}
       />
     </Box>
     <Box>
       <Button className={classes.button} onClick={handleCancel}>
         Cancel
       </Button>
       <Button
         className={classes.button}
         type="submit"
         variant="contained"
         color="primary"
       >
         Submit
       </Button>
       <Button className={classes.button}>Return</Button>
     </Box>
   </form>
 );
};

export default RegistrationForm;
