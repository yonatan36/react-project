import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const useStyles = makeStyles((theme) => ({
  footer: {
    
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1),
  },
  iconButton: {
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center" fontWeight={600}>
          © {new Date().getFullYear()} yonatan taub
        </Typography>
        <Typography variant="body2" align="center">
          <IconButton
            className={classes.iconButton}
            href="https://www.linkedin.com/"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            href="https://github.com/https://github.com/avragol"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            href="https://wa.me/972585668625"
          >
            <WhatsAppIcon />
          </IconButton>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
