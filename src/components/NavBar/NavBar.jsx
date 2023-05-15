import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchPartial from "./SearchPartial";
import NavLinkComponent from "./NavLinkComponent";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

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
    label: "Login",
    url: ROUTES.LOGIN,
  },
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
];

//logged in users
const authedPages = [
  {
    label: "Fav cards",
    url: ROUTES.FAV,
  },
  {
    label: "LOGOUT",
    url: ROUTES.LOGOUT,
  },
];
const BizPages = [
  {
    label: "My cards",
    url: ROUTES.MYCARDS,
  },
];

const AdminPage = [
  {
    label: "sand-box",
    url: ROUTES.SANDBOX,
  },
  
]

const ResponsiveAppBar = ({ darkMode, onThemeChange }) => {
  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );
  const { payload } = useSelector((bigPieBigState) => bigPieBigState.authSlice);

  const moveToProfile = () => {
    navigate(ROUTES.PROFILE);
  };
  const LogoCkick = () => {
    navigate(ROUTES.HOME);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
    axios
      .get("/users/userInfo/")
      .then((userInfo) => {
        setAvatar({
          url: userInfo.data.imageUrl,
          alt: userInfo.data.imageAlt,
        });
      })
      .catch((err) => {});
  }, [isLoggedIn]);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton onClick={LogoCkick}>
            <SportsVolleyballIcon />
            <Typography variant="h6" noWrap>
              YOYO
            </Typography>
          </IconButton>

          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn && payload.biz // Add an if statement to conditionally render BizPages
              ? BizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isLoggedIn && payload.isAdmin // Add an if statement to conditionally render BizPages
              ? AdminPage.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
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

          {isLoggedIn && (
            <Box>
              <IconButton sx={{ ml: 2, p: 0 }} onClick={moveToProfile}>
                <Avatar alt={avatar.alt} src={avatar.url} />
              </IconButton>
            </Box>
          )}

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
              {isLoggedIn && payload.biz // Add an if statement to conditionally render BizPages
                ? BizPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))
                : ""}
              {isLoggedIn && payload.isAdmin 
                ? AdminPage.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))
                : ""}
              {isLoggedIn
                ? authedPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
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
