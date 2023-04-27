import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

const About = () => {
  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          About Us
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            posuere lacus nec ex convallis, vel mattis elit suscipit. Duis
            feugiat, urna vel dapibus venenatis, augue odio lobortis massa, non
            consectetur est nisi sit amet odio.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar alt="CEO" sx={{ width: 160, height: 160, margin: "auto" }} />
          <Typography variant="h5" align="center" gutterBottom>
            John Doe
          </Typography>
          <Typography variant="body1" align="center">
            CEO
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 1"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jane Doe
          </Typography>
          <Typography variant="body1" align="center">
            Co-Founder
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 2"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jack Smith
          </Typography>
          <Typography variant="body1" align="center">
            Marketing Director
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 3"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jill Johnson
          </Typography>
          <Typography variant="body1" align="center">
            Operations Manager
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default About;
