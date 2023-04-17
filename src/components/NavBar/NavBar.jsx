import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";



const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];



const ResponsiveAppBar = ({ darkMode, onThemeChange }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <AdbIcon />
          <Typography variant="h6" noWrap>
            LOGO
          </Typography>

          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink key={page.url} to={page.url}>
                {({ isActive }) => (
                  <Typography
               
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      p: 2,
                      color: `${isActive ? "yellow" : "turquoise"}`,
                      fontWeight: "bold",
                      textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      overflow: "hidden",
                      "&::before, &::after": {
                        content: "''",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        transition:
                          "all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
                      },
                      "&::before": {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        transform: "translateX(-100%) skewX(-15deg)",
                      },
                      "&::after": {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        transform: "translateX(100%) skewX(15deg)",
                      },
                      "&:hover::before": {
                        transform: "translateX(0%) skewX(-15deg)",
                        opacity: 1,
                      },
                      "&:hover::after": {
                        transform: "translateX(0%) skewX(15deg)",
                        opacity: 1,
                      },
                      "&:hover": {
                        textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
                      },
                    }}
                  >
                    {page.label}
                  </Typography>
                )}
              </NavLink>
            ))}
          </Box>
          <Typography sx={{ display: { xs: "none", md: "inline" } }}>
            {darkMode ? "Dark" : "Light"} Mode
          </Typography>
          <IconButton color="inherit" onClick={onThemeChange} sx={{ ml: 1 }}>
            {darkMode ? <BedtimeIcon /> : <WbSunnyIcon />}
          </IconButton>
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLink to={page.url}>
                    {/* if the current page and the link is the same then it will change the color of the link */}
                    {({ isActive }) => (
                      <Typography
                       
                        sx={{
                          color: "white",
                          display: "block",
                          color: `${isActive ? "yellow" : "turquoise"}`,
                          fontWeight: "bold",
                          textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                         
                            textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
                          },
                        }}
                      >
                        {page.label}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
ResponsiveAppBar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default ResponsiveAppBar;
