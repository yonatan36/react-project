import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import SearchPartial from "./SearchPartial";
import NavLinkComponent from "./NavLinkComponent";





// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//admin/biz pages
const adminBizPages = [
  {
    label: "Create",
    url: ROUTES.REGISTER,
  },
];

//logged in users
const authedPages = [
 

  {
    label: "FAV CARADS",
    url: ROUTES.FAV,
  },
  {
    label: "LOGOUT",
    url: ROUTES.LOGOUT,
  },
  
];

const BizPages = [
  {
    label: "MY CARDS",
    url: ROUTES.MYCARDS,
  },
];


const ResponsiveAppBar = ({ darkMode, onThemeChange }) => {
    const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
    const isBiz = useSelector(
      (bigPieBigState) => bigPieBigState.bizSlice.biz
    );
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
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn && isBiz
              ? BizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : // Render alternative content or an empty string if not logged in or not a business
                ""}
            {isLoggedIn
              ? authedPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>

          <Typography sx={{ display: { xs: "none", md: "inline" } }}>
            {darkMode ? "Dark" : "Light"} Mode
          </Typography>
          <IconButton color="inherit" onClick={onThemeChange} sx={{ ml: 1 }}>
            {darkMode ? <BedtimeIcon /> : <WbSunnyIcon />}
          </IconButton>
          <SearchPartial />
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

       