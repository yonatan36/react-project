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
import atom from "../logo.svg";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";



const EditCardPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(null);
  const [errorFroemJoi, setErrorFromJoi] = useState({});


  
  useEffect(() => {
    (async () =>{

    try{
    const errors = validateEditCardParamsSchema({ id });
    if (errors) {
      navigate("/");
      return;
    }
  const {data}  = await axios.get("/cards/card/" + id);
  console.log(data);


  } catch (err){
    console.log(err);
  }
     })()
    //setInputState(card);
  }, [id]);

  const handleInputChange = (event) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[event.target.id] = event.target.value;
    setInputState(newInputState);
  };

  const handleSaveBtnClick = () => {
    console.log(handleSaveBtnClick)
    const joiRespone = validateEditSchema(inputState);
    setErrorFromJoi(joiRespone);
    if (!joiRespone) {
      navigate(ROUTES.HOME);
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
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: 2,
            }}
            src={inputState.img ? inputState.img : atom}
          />
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="img"
                  label="img"
                  name="img"
                  autoComplete="img"
                  onChange={handleInputChange}
                  value={inputState.img}
                />
                {errorFroemJoi.img && (
                  <Alert severity="warning">
                    {errorFroemJoi.img.join("<br>")}
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
                  value={inputState.title}
                />
                {errorFroemJoi.title && (
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
                  name="price"
                  label="price"
                  type="text"
                  id="price"
                  autoComplete="price"
                  onChange={handleInputChange}
                  value={inputState.price}
                />
                {errorFroemJoi.price && (
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
                  value={inputState.description}
                />
                {errorFroemJoi.description && (
                  <Alert severity="warning">
                    {errorFroemJoi.description.map((item) => (
                      <div key={"description-errors" + item}>{item}</div>
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
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
