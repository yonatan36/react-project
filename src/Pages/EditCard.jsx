import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidtion";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";

const EditCardPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState();
  const [errorFroemJoi, setErrorFromJoi] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        //if inputs is empty
        let newInputState = {
          ...data,
        };
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.__v;
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setErrorFromJoi(joiResponse);
      console.log(joiResponse);
      if (!joiResponse) {
        //move to homepage

        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);

        toast.success("changes made successfully!");
      }
    } catch (err) {
      console.log("err", err);
      toast.error("error");
    }
  };
  const handleCancleBtnClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const newInputState = { ...inputState, [id]: value };
    setInputState(newInputState);

    const joiResponse = validateEditSchema(newInputState);

    if (joiResponse && joiResponse[id]) {
      setErrorFromJoi({ ...errorFroemJoi, [id]: joiResponse[id] });
    } else {
      setErrorFromJoi({ ...errorFroemJoi, [id]: "" });
    }
  
  };

  if (!inputState) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="xs">
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit card
          </Typography>
          <Box
            component="img"
            sx={{
              height: 200,
              width: 350,
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: 2,
            }}
            alt={inputState.alt ? inputState.alt : ""}
            src={inputState.url ? inputState.url : atom}
          />
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="url"
                  label="Url"
                  name="url"
                  autoComplete="url"
                  onChange={handleInputChange}
                  value={inputState.url ? inputState.url : ""}
                />
                {errorFroemJoi && errorFroemJoi.url && (
                  <Alert severity="warning">
                    {errorFroemJoi.url.join("<br>")}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  onChange={handleInputChange}
                  value={inputState.title}
                />
                {errorFroemJoi && errorFroemJoi.title && (
                  <Alert severity="warning">
                    {errorFroemJoi.title.map((item) => (
                      <div key={"title-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
             
                  fullWidth
                  name="subTitle"
                  label="subTitle"
                  id="subTitle"
                  type="text"
                  autoComplete="subTitle"
                  onChange={handleInputChange}
                  value={inputState.subTitle}
                />
                {errorFroemJoi && errorFroemJoi.price && (
                  <Alert severity="warning">
                    {errorFroemJoi.price.map((item) => (
                      <div key={"price-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  onChange={handleInputChange}
                  value={inputState.description}
                />
                {errorFroemJoi && errorFroemJoi.description && (
                  <Alert severity="warning">
                    {errorFroemJoi.description.map((item) => (
                      <div key={"description-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="country"
                  id="country"
                  autoComplete="country"
                  onChange={handleInputChange}
                  value={inputState.country}
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
                  required
                  fullWidth
                  name="city"
                  label="city"
                  id="city"
                  autoComplete="city"
                  onChange={handleInputChange}
                  value={inputState.city}
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
                  required
                  fullWidth
                  name="street"
                  label="street"
                  id="street"
                  autoComplete="street"
                  onChange={handleInputChange}
                  value={inputState.street || ""}
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
                  required
                  fullWidth
                  name="houseNumber"
                  label="houseNumber"
                  id="houseNumber"
                  autoComplete="houseNumber"
                  onChange={handleInputChange}
                  value={inputState.houseNumber}
                />
                {errorFroemJoi && errorFroemJoi.houseNumber && (
                  <Alert severity="warning">
                    {errorFroemJoi.houseNumber.map((item) => (
                      <div key={"houseNumber-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="email"
                  id="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={inputState.email}
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
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="phone"
                  value={inputState.phone || ""}
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
export default EditCardPage;
